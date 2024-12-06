<?php
error_reporting(E_ERROR);

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
    $bedNum = $data->num;
    $end = $data->end;

    $sql = "UPDATE beds SET bedEmpty=1 WHERE bedNum=:bedNum";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':bedNum', $bedNum, PDO::PARAM_STR);
    if ($stmt->execute()) {
        echo json_encode([
            'message' => 'bed set to empty with success'
        ]);
    }

    $get = "SELECT historyp FROM patient WHERE bedNum=:bedNum";
    $getstmt = $conn->prepare($get);
    $getstmt->bindValue(':bedNum', $bedNum, PDO::PARAM_STR);
    $getstmt->execute();
    $result = $getstmt->fetch(PDO::FETCH_ASSOC);
    $getstmt->execute();

    if ($result !== false) {
        $history = unserialize($result['historyp']);
    } else {
        echo json_encode([
            'message' => 'could not find history',
            'success'=>0
        ]);
    }

    if (empty($history)) {
        echo json_encode([
            'message' => 'history is empty',
            'success'=>0
        ]);
    }
    

    foreach ($history as &$couple) {
        if ($couple[1] === null ) {
            // Found the couple with the second element empty
            $couple[1] = $end;
            echo (json_encode(['found' =>$couple]));
            break;
        }
    }

    $newhist = serialize($history);
    $modsql = "UPDATE patient SET historyp=:newhist, bedNum=null WHERE patient.bedNum=:bedNum";
    $modstmt = $conn->prepare($modsql);
    $modstmt->bindValue(':bedNum', $bedNum, PDO::PARAM_STR);
    $modstmt->bindValue(':newhist', $newhist, PDO::PARAM_STR);

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
}?>
