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
$data = $input->form;
$id = $input->id;

$getsql = 'SELECT * FROM admin WHERE id = :id';
$getstmt = $conn->prepare($getsql);
$getstmt->bindValue(':id', $id, PDO::PARAM_INT);
$getstmt->execute();

if ($getstmt->rowCount() <= 0) {
    echo json_encode([
        'success' => 0,
        'message' => 'Could not find admin'
    ]);
    exit;
} else {
    $row = $getstmt->fetch(PDO::FETCH_ASSOC);
    $first_namea = isset($data->first_namea) ? $data->first_namea : $row['first_namea'];
    $last_namea = isset($data->last_namea) ? $data->last_namea : $row['last_namea'];
    $passworda = isset($data->passworda) ? $data->passworda : $row['passworda'];
    $contacta = isset($data->contacta) ? $data->contacta : $row['contacta'];
    $gmail = isset($data->gmail) ? $data->gmail : $row['gmail'];
}

try {
    $sql = "UPDATE `admin` SET 
        `first_namea`=:first_namea,
        `last_namea`=:last_namea,
        `passworda`=:passworda,
        `contacta`=:contacta,
        `gmail`=:gmail
        WHERE `id`=:id";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':first_namea', $first_namea, PDO::PARAM_STR);
    $stmt->bindValue(':last_namea', $last_namea, PDO::PARAM_STR);
    $stmt->bindValue(':passworda', $passworda, PDO::PARAM_STR);
    $stmt->bindValue(':contacta', $contacta, PDO::PARAM_STR);
    $stmt->bindValue(':gmail', $gmail, PDO::PARAM_STR);

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
