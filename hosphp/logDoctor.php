<?php
header("Access-Control-Allow-Headers: access");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

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

$tel = filter_input(INPUT_GET, 'Tel', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_GET, 'password', FILTER_SANITIZE_STRING);
$today = filter_input(INPUT_GET, 'today', FILTER_SANITIZE_STRING);
try {
    $sql = "SELECT * from doctor where contactD='$tel' and passwordD='$password'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $logs = (!empty($data[0]['loginsD'])) ? unserialize($data[0]['loginsD']) : [];
        $logs[] = $today;
        $newlog = serialize($logs);

        $usql = "UPDATE doctor SET loginsD='$newlog' WHERE contactD='$tel' AND passwordD='$password'";
        $ustmt = $conn->prepare($usql);

        if ($ustmt->execute()) {
            echo json_encode([
                'success' => 1,
                'data' => $data,
            ]);
        } else {
            echo json_encode([
                'success' => 0,
                'message' => "Couldn't update history",
            ]);
        }
    } else {
        echo json_encode([
            'success' => 0,
            'message' => "Access Denied",
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