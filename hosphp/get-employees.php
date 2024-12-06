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
try{
    $docsql="SELECT * from doctor";
    $docstmt = $conn->prepare($docsql);
    $docstmt->execute();
    $nursql="SELECT * from nurses";
    $nurstmt = $conn->prepare($nursql);
    $nurstmt->execute();
    $admsql="SELECT * from admin";
    $admstmt = $conn->prepare($admsql);

    $admstmt->execute();
    if ($docstmt->rowCount() > 0 && $nurstmt->rowCount() && $admstmt->rowCount()) {
        $doctors = $docstmt->fetchAll(PDO::FETCH_ASSOC);
        $nurses = $nurstmt->fetchAll(PDO::FETCH_ASSOC);
        $admins = $admstmt->fetchAll(PDO::FETCH_ASSOC);
        $sql = "SELECT roomNum, nurseNum FROM room";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $newNurses = [];
        $newdocs=[];
        foreach($doctors as &$doctor){
            $ser=$doctor['daysD'];
            $doctor['daysD'] = array(unserialize($doctor['daysD']));
            $doctor['loginsD']=array(unserialize($doctor['loginsD']));
            $newdocs[]=$doctor;
        }

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
        foreach($admins as &$admin){
            $admin['logins']=array(unserialize($admin['logins']));
        }

        echo json_encode([
            'success' => 1,
            'doctors' => $newdocs,
            'nurses'=>$newNurses,
            'admins'=>$admins
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

