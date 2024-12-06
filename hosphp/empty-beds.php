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
$dep=filter_input(INPUT_GET, 'dep', FILTER_SANITIZE_STRING);
try{
    $sql="SELECT bedNum from beds b,room r where b.roomNum=r.roomNum and r.depNum = (select depNum from department where depName = :dep) and b.bedEmpty=1";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':dep', $dep, PDO::PARAM_STR);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => 1,
            'data' => $data,
        ]);
    } else {
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
