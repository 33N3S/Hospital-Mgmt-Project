<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
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

$mail = filter_input(INPUT_GET, 'mail', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_GET, 'password', FILTER_SANITIZE_STRING);
$today = filter_input(INPUT_GET, 'today', FILTER_SANITIZE_STRING);

try {
    $sql = "SELECT id, logins as logs from admin WHERE gmail='$mail' AND passworda='$password'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $logs = (!empty($data[0]['logs'])) ? unserialize($data[0]['logs']) : [];
        $logs[] = $today;
        $newlog = serialize($logs);

        $usql = "UPDATE admin SET logins='$newlog' WHERE gmail='$mail' AND passworda='$password'";
        $ustmt = $conn->prepare($usql);

        if ($ustmt->execute()) {
            echo json_encode([
                'success' => 1,
                'data' => $data,
            ]);
        } else {
            echo json_encode([
                'success' => 0,
                'message' => "Update failed",
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
