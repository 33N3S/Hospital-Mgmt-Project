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
    
$serializedate=serialize($hist);

try {
    $sql = "INSERT INTO `doctor` (`first_nameD`, `last_nameD`, `DshiftS`, `DshiftE`, `specD`, `contactD`, `depNum`, `passwordD`, `daysD`) 
    Values (:first_nameD, :last_nameD, :DshiftS, :DshiftE, :specD, :contactD, :depNum, :passwordD, :daysD)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':first_nameD', $data->first_nameD);
    $stmt->bindParam(':last_nameD', $data->last_nameD);
    $stmt->bindParam(':DshiftS', $data->DshiftS);
    $stmt->bindParam(':DshiftE', $data->DshiftE);
    $stmt->bindParam(':specD', $data->specD);
    $stmt->bindParam(':contactD', $data->contactD);
    $stmt->bindParam(':depNum', $data->depNum);
    $stmt->bindParam(':passwordD', $data->passwordD);
    $stmt->bindParam(':daysD', serialize($data->daysD));

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