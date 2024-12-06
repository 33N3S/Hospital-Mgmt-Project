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
$getsql = 'SELECT * FROM nurses WHERE nurseNum = :id';
$getstmt = $conn->prepare($getsql);
$getstmt->bindValue(':id', $id, PDO::PARAM_INT);
$getstmt->execute();

if ($getstmt->rowCount() <= 0) {
    echo json_encode([
        'success' => 0,
        'message' => 'Could not find nurse'
    ]);
    exit;
} else {
    $row = $getstmt->fetch(PDO::FETCH_ASSOC);
    $numDoc = isset($data->numDoc) ? $data->numDoc : $row['numDoc'];
    $first_nameN = isset($data->first_nameN) ? $data->first_nameN : $row['first_nameN'];
    $last_nameN = isset($data->last_nameN) ? $data->last_nameN : $row['last_nameN'];
    $NshiftS = isset($data->NshiftS) ? $data->NshiftS : $row['NshiftS'];
    $NshirtE = isset($data->NshirtE) ? $data->NshirtE : $row['NshirtE'];
    $daysN = isset($data->daysN) ? serialize($data->daysN) : $row['daysN'];
}

try {
    $sql = "UPDATE `nurses` SET 
        `first_nameN`=:first_nameN,
        `last_nameN`=:last_nameN,
        `NshiftS`=:NshiftS,
        `NshirtE`=:NshirtE,
        `daysN`=:daysN,
        `numDoc`=:numDoc
        WHERE `nurseNum`=:id";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':first_nameN', $first_nameN, PDO::PARAM_STR);
    $stmt->bindValue(':last_nameN', $last_nameN, PDO::PARAM_STR);
    $stmt->bindValue(':NshiftS', $NshiftS, PDO::PARAM_STR);
    $stmt->bindValue(':NshirtE', $NshirtE, PDO::PARAM_STR);
    $stmt->bindValue(':daysN', $daysN, PDO::PARAM_STR);
    $stmt->bindValue(':numDoc', $numDoc, PDO::PARAM_INT);
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
