<?php

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
        'success' => 0,
        'message' => 'Bad request'
    ]);
    die();
}

require('db.php');
$database = new operation();
$conn = $database->dbcon();
$input = json_decode(file_get_contents("php://input"));
$data=$input->form;
$id=$input->id;
$getsql = 'SELECT * FROM doctor WHERE numDoc = :id';
$getstmt = $conn->prepare($getsql);
$getstmt->bindValue(':id', $id, PDO::PARAM_INT);
$getstmt->execute();
if ($getstmt->rowCount() <= 0) {
    echo json_encode([
        'success' => 0,
        'message' => 'Could not find doctor'
    ]);
    exit;
} else {
    $row = $getstmt->fetch(PDO::FETCH_ASSOC);
    $first_nameD = isset($data->first_nameD) ? $data->first_nameD : $row['first_nameD'];
    $last_nameD = isset($data->last_nameD) ? $data->last_nameD : $row['last_nameD'];
    $DshiftS = isset($data->DshiftS) ? $data->DshiftS : $row['DshiftS'];
    $DshiftE = isset($data->DshiftE) ? $data->DshiftE : $row['DshiftE'];
    $specD = isset($data->specD) ? $data->specD : $row['specD'];
    $contactD = isset($data->contactD) ? $data->contactD : $row['contactD'];
    $depNum = isset($data->depNum) ? $data->depNum : $row['depNum'];
    $passwordD = isset($data->passwordD) ? $data->passwordD : $row['passwordD'];
    $daysD = isset($data->daysD) ? serialize($data->daysD) : $row['daysD'];
}

try {
    $sql = "UPDATE `doctor` SET 
        `first_nameD`=:first_nameD,
        `last_nameD`=:last_nameD,
        `DshiftS`=:DshiftS,
        `DshiftE`=:DshiftE,
        `specD`=:specD,
        `contactD`=:contactD,
        `depNum`=:depNum,
        `passwordD`=:passwordD,
        `daysD`=:daysD
        WHERE `numDoc`=:numDoc";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':numDoc', $id, PDO::PARAM_INT);
    $stmt->bindValue(':first_nameD', $first_nameD, PDO::PARAM_STR);
    $stmt->bindValue(':last_nameD', $last_nameD, PDO::PARAM_STR);
    $stmt->bindValue(':DshiftS', $DshiftS, PDO::PARAM_STR);
    $stmt->bindValue(':DshiftE', $DshiftE, PDO::PARAM_STR);
    $stmt->bindValue(':specD', $specD, PDO::PARAM_STR);
    $stmt->bindValue(':contactD', $contactD, PDO::PARAM_STR);
    $stmt->bindValue(':depNum', $depNum, PDO::PARAM_INT);
    $stmt->bindValue(':passwordD', $passwordD, PDO::PARAM_STR);
    $stmt->bindValue(':daysD', $daysD, PDO::PARAM_STR);
    if ($stmt->execute()) {
        echo json_encode([
            'success' => 1,
            'message' => "Data updated successfully",
        ]);
    } else {
        echo json_encode([
            'success' => 0,
            'message' => "Could not update data",
        ]);
    }
} catch (PDOException $e) {
    echo json_encode(array('message' => 'Error: ' . $e->getMessage()));
}
?>