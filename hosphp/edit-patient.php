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
if ($method != "PUT") {
    echo json_encode([
        'success'=>0,
        'message'=>'bad request'
    ]);
    die();
}

require('db.php');
$database = new operation();
$conn = $database->dbcon();
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->cinPatient)) {
    echo json_encode([
        'success' => 0,
        'message' => 'CIN is arbitrary'
    ]);
    exit;
} elseif (empty($data->cinPatient)) {
    echo json_encode([
        'success' => 0,
        'message' => 'CIN is empty'
    ]);
    exit;
}

$getsql='SELECT * FROM patient WHERE cinPatient = :id';
$getstmt = $conn->prepare($getsql);
$getstmt->bindValue(':id', $data->cinPatient, PDO::PARAM_STR);
$getstmt->execute();
if($getstmt->rowCount() <=0) {
    echo json_encode([
        'success'=>0,
        'message'=>'could not find patient'
    ]);
    exit;
} else {
    $row = $getstmt->fetch(PDO::FETCH_ASSOC);
    $first_namep = isset($data->first_namep) ? $data->first_namep : $row['first_namep'];
    $last_namep = isset($data->last_namep) ? $data->last_namep : $row['last_namep'];
    $statep = isset($data->statep) ? $data->statep : $row['statep'];
    $relativep = isset($data->relativep) ? $data->relativep : $row['relativep'];
    $sexp = isset($data->sexp) ? $data->sexp : $row['sexp'];
    $naissancep = isset($data->naissancep) ? $data->naissancep : $row['naissancep'];
    $contactp = isset($data->contactp) ? $data->contactp : $row['contactp'];
    $passwordrelative = isset($data->passwordrelative) ? $data->passwordrelative : $row['passwordrelative'];
    $bedNum = isset($data->bedNum) ? $data->bedNum : $row['bedNum'];
    $notep = isset($data->notep)? $data->notep : $row['notep'];
}

try {
    $sql = "UPDATE `patient` SET 
        `first_namep`=:first_namep,
        `last_namep`=:last_namep,
        `statep`=:statep,
        `relativep`=:relativep,
        `sexp`=:sexp,
        `naissancep`=:naissancep,
        `contactp`=:contactp,
        `bedNum`=:bedNum,
        `passwordrelative`=:passwordrelative,
        `notep`=:notep
        WHERE `cinPatient`=:cinPatient";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':cinPatient', $data->cinPatient, PDO::PARAM_STR);
    $stmt->bindValue(':notep', $notep, PDO::PARAM_STR);
    $stmt->bindValue(':first_namep', $first_namep, PDO::PARAM_STR);
    $stmt->bindValue(':last_namep', $last_namep, PDO::PARAM_STR);
    $stmt->bindValue(':statep', $statep, PDO::PARAM_STR);
    $stmt->bindValue(':relativep', $relativep, PDO::PARAM_STR);
    $stmt->bindValue(':sexp', $sexp, PDO::PARAM_STR);
    $stmt->bindValue(':naissancep', $naissancep, PDO::PARAM_STR);
    $stmt->bindValue(':contactp', $contactp, PDO::PARAM_STR);
    $stmt->bindValue(':bedNum', $bedNum, PDO::PARAM_STR);
    $stmt->bindValue(':passwordrelative', $passwordrelative, PDO::PARAM_STR);
    if ($stmt->execute()) {
        echo json_encode([
            'success' => 1,
            'message' => "Data entered successfully",
        ]);
    } else {
        echo json_encode([
            'success' => 0,
            'message' => "Could not update data",
        ]);
    }}
     catch (PDOException $e) {
        echo json_encode(array('message' => 'Error: ' . $e->getMessage()));
        }
