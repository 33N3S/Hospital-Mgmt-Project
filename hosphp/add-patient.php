<?php
error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,PUT");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json;charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

require('db.php');
$database = new operation();
$conn = $database->dbcon();
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->cinPatient) || !isset($data->first_namep) || !isset($data->last_namep)) {
    echo json_encode([
        'success' => 0,
        'message' => 'Must enter required fields'
    ]);
    exit;
} elseif (empty($data->cinPatient) || empty($data->first_namep) || empty($data->last_namep)) {
    echo json_encode([
        'success' => 0,
        'message' => 'Required fields are empty'
    ]);
    exit;
}

if ($data->bedNum == 0) {
    $num = "SELECT bedNum FROM beds b,room r,department d WHERE b.roomNum=r.roomNum AND d.depName=:depName AND bedEmpty=true LIMIT 1";
    $numstmt = $conn->prepare($num);
    $numstmt->bindValue(':depName', $data->depName, PDO::PARAM_STR);
    $numstmt->execute();
    $result = $numstmt->fetch(PDO::FETCH_ASSOC);
    $data->bedNum = intval($result["bedNum"]);
    if ($data->bedNum == 0) {
        echo json_encode([
            'success' => 0,
            'message' => "No empty bed found"
        ]);
        exit;
    }
}

$hist=array(array($data->start, null));
    
$serializedate=serialize($hist);

try {
    $sql = "INSERT INTO `patient` (
        cinPatient,
        first_namep,
        last_namep,
        statep,
        relativep,
        sexp,
        naissancep,
        contactp,
        bedNum,
        passwordrelative,
        historyp
    ) VALUES (
        :cinPatient,
        :first_namep,
        :last_namep,
        :statep,
        :relativep,
        :sexp,
        :naissancep,
        :contactp,
        :bedNum,
        :passwordrelative,
        :historyp
    )";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':cinPatient', $data->cinPatient, PDO::PARAM_STR);
    $stmt->bindValue(':first_namep', $data->first_namep, PDO::PARAM_STR);
    $stmt->bindValue(':last_namep', $data->last_namep, PDO::PARAM_STR);
    $stmt->bindValue(':statep', $data->statep, PDO::PARAM_STR);
    $stmt->bindValue(':relativep', $data->relativep, PDO::PARAM_STR);
    $stmt->bindValue(':sexp', $data->sexp, PDO::PARAM_STR);
    $stmt->bindValue(':naissancep', $data->naissancep, PDO::PARAM_STR);
    $stmt->bindValue(':contactp', $data->contactp, PDO::PARAM_STR);
    $stmt->bindValue(':bedNum', $data->bedNum, PDO::PARAM_STR);
    $stmt->bindValue(':passwordrelative', $data->passwordrelative, PDO::PARAM_STR);
    $stmt->bindValue(':historyp', $serializedate, PDO::PARAM_STR);

    $updt="UPDATE beds set bedEmpty = 0 where bedNum=$data->bedNum";
    $updtstmt=$conn->prepare($updt);
    $updtstmt->execute();

    if ($stmt->execute()) {
        echo json_encode([
            'success' => 1,
            'message' => "Data entered successfully",
        ]);
    }
}catch(PDOException $e){
    http_response_code(500);
    echo json_encode([
       
            'success' => 0,
            'message' => $e->getMessage(),
       
    ]);}
?>