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
$numDoc = filter_input(INPUT_GET, 'numDoc', FILTER_SANITIZE_STRING);

if (!$numDoc) {
    echo json_encode([
        'success' => 0,
        'message' => "Invalid input",
    ]);
    exit;
}

try {
    $psql = "SELECT * FROM patient p, room r, nurses n, beds b WHERE p.bedNum IS NOT NULL AND p.bedNum = b.bedNum AND b.roomNum = r.roomNum AND r.nurseNum = n.nurseNum AND n.numDoc = :numDoc";
    $pstmt = $conn->prepare($psql);
    $pstmt->bindValue(':numDoc', $numDoc, PDO::PARAM_INT);
    $pstmt->execute();

    $nsql = "SELECT * FROM nurses WHERE numDoc = :numDoc";
    $nstmt = $conn->prepare($nsql);
    $nstmt->bindValue(':numDoc', $numDoc, PDO::PARAM_INT);
    $nstmt->execute();

    if ($pstmt->rowCount() > 0 || $nstmt->rowCount() > 0) {
        $patients = $pstmt->fetchAll(PDO::FETCH_ASSOC);
        $nurses = $nstmt->fetchAll(PDO::FETCH_ASSOC);
        $sql = "SELECT roomNum, nurseNum FROM room";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $newNurses = [];

        foreach ($nurses as &$nurse) {
            $nurse['daysN'] = array(unserialize($nurse['daysN']));
            $nurseRooms = [];
            foreach ($rooms as $room) {
                if ($room['nurseNum'] == $nurse['nurseNum']) {
                    $nurseRooms[] = $room['roomNum'];
                }
            }
            $nurse['rooms'] = $nurseRooms;
            $newNurses[] = $nurse;
        }
        echo json_encode([
            'success' => 1,
            'patients' => $patients,
            'nurses' => $nurses
        ]);
    } else {
        echo json_encode([
            'success' => 0,
            'message' => "No data found",
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