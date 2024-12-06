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
try {
  // Assuming $data is an object with the required properties
    $sql = "INSERT INTO `nurses` (`first_nameN`, `last_nameN`, `NshiftS`, `NshirtE`, `numDoc`, `daysN`) 
    VALUES (:first_nameN, :last_nameN, :NshiftS, :NshirtE, :numDoc, :daysN)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':first_nameN', $data->first_nameN);
    $stmt->bindParam(':last_nameN', $data->last_nameN);
    $stmt->bindParam(':NshiftS', $data->NshiftS);
    $stmt->bindParam(':NshirtE', $data->NshirtE);
    $stmt->bindParam(':numDoc', $data->numDoc);
    $stmt->bindParam(':daysN', serialize($data->daysN));
    $stmt->execute();

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