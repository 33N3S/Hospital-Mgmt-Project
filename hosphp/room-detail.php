<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json;charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad request',
    ]);
    exit;
}

require('db.php');
$database = new operation();
$conn = $database->dbcon();
$roomNum=filter_input(INPUT_GET, 'roomNum', FILTER_SANITIZE_STRING);

try{
    $sql="SELECT DISTINCT b.bedNum, b.bedEmpty, p.cinPatient, p.statep 
    FROM beds b 
    JOIN room r ON b.roomNum = r.roomNum 
    LEFT JOIN patient p ON p.bedNum = b.bedNum 
    WHERE r.roomNum = :roomNum";
    $nursql = "SELECT first_nameN, last_nameN 
    FROM room r 
    JOIN nurses n ON r.nurseNum = n.nurseNum 
    WHERE r.roomNum = :roomNum";
    $nurstmt = $conn->prepare($nursql);
    $nurstmt->bindValue(':roomNum', $roomNum, PDO::PARAM_STR);
    $nurstmt->execute();
    $nurse = $nurstmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':roomNum', $roomNum, PDO::PARAM_STR);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => 1,
            'data' => $data,
            'nurse'=>$nurse,
        ]);
    } 
    else {
        echo json_encode([
            'success' => 0,
            'message' => "Error while fetching data",
        ]);
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
