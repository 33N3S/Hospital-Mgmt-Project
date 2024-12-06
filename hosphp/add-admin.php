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
    $sql = "INSERT INTO `admin` (`gmail`, `first_namea`, `last_namea`, `passworda`, `contacta`) 
        VALUES (:gmail, :first_namea, :last_namea, :passworda, :contacta)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':gmail', $data->gmail);
    $stmt->bindParam(':first_namea', $data->first_namea);
    $stmt->bindParam(':last_namea', $data->last_namea);
    $stmt->bindParam(':passworda', $data->passworda);
    $stmt->bindParam(':contacta', $data->contacta);
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