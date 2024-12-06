<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,PUT,GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json;charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

try {
    require('db.php');
    $database = new operation();
    $conn = $database->dbcon();
    $data = json_decode(file_get_contents("php://input"));
    $sql = "UPDATE beds SET bedEmpty=0 WHERE bedNum=:bedNum";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':bedNum', $data->bedNum, PDO::PARAM_STR);
    if ($stmt->execute()) {
        echo json_encode([
            'message' => 'bed set full with success'
        ]);
    }
    $get = "SELECT historyp FROM patient WHERE cinPatient=:cin";
    $getstmt = $conn->prepare($get);
    $getstmt->bindValue(':cin', $data->cinPatient, PDO::PARAM_STR);
    $getstmt->execute();
    $result = $getstmt->fetch(PDO::FETCH_ASSOC);
    $getstmt->execute();

    if ($result !== false) {
        $history = unserialize($result['historyp']);
    } else {
        echo json_encode([
            'message' => 'could not find history',
        ]);
    }

    if (empty($history)) {
        $history=array(array($data->start, null));
    }
    
    else{
        array_push($history, array($data->start,null));
    }
    //update history
    
    $newhist = serialize($history);
    if(isset($data->statep)){
    
        $modsql = "UPDATE patient SET historyp=:newhist, bedNum=:bedNum,statep=:newstate  WHERE cinPatient=:cin";
        $modstmt = $conn->prepare($modsql);
        $modstmt->bindValue(':bedNum', $data->bedNum, PDO::PARAM_STR);
        $modstmt->bindValue(':newhist', $newhist, PDO::PARAM_STR);
        $modstmt->bindValue(':cin', $data->cinPatient, PDO::PARAM_STR);
        $modstmt->bindValue(':newstate', $data->statep, PDO::PARAM_STR);


    }
    if(!isset($data->statep)){

        $modsql = "UPDATE patient SET historyp=:newhist, bedNum=:bedNum  WHERE cinPatient=:cin";
        $modstmt = $conn->prepare($modsql);
        $modstmt->bindValue(':bedNum', $data->bedNum, PDO::PARAM_STR);
        $modstmt->bindValue(':newhist', $newhist, PDO::PARAM_STR);
        $modstmt->bindValue(':cin', $data->cinPatient, PDO::PARAM_STR);
        
    }
    if ($modstmt->execute()) {
        echo json_encode([
            'message' => 'history and patient bond updated!',
            'success' => 1
        ]);
        exit;
    } else {
        echo json_encode([
            'message' => 'could not update history or bond!',
            'success' => 0
        ]);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage(),
    ]);
    exit;
}
?>