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

try {
    $sql = "SELECT depName,depNum FROM `department`";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $rcsql = "SELECT d.depName, COUNT(r.roomNum) as roomCount FROM room r, department d WHERE r.depNum=d.depNum GROUP BY d.depNum";
        $stmt = $conn->prepare($rcsql);
        $stmt->execute();
        $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $bcsql = "SELECT d.depName, COUNT(b.bedNum) as bedCount FROM room r, department d, beds b WHERE b.roomNum=r.roomNum AND r.depNum=d.depNum AND b.bedEmpty=1 GROUP BY d.depNum";
        $stmt = $conn->prepare($bcsql);
        $stmt->execute();
        $beds = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $ncsql = "SELECT d.depName, COUNT(n.nurseNum) as nurseCount FROM department d, doctor doc, nurses n WHERE doc.depNum=d.depNum AND n.numDoc=doc.numDoc GROUP BY d.depNum";
        $stmt = $conn->prepare($ncsql);
        $stmt->execute();
        $nurses = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $deps = [];
        foreach ($data as $index => $dep) {
            
            $roomCount = isset($rooms[$index]['roomCount']) ? $rooms[$index]['roomCount'] : 0;
            $bedCount = isset($beds[$index]['bedCount']) ? $beds[$index]['bedCount'] : 0;
            $nurseCount = isset($nurses[$index]['nurseCount']) ? $nurses[$index]['nurseCount'] : 0;

            $newObject = [
                'depNum'=>$dep['depNum'] ,
                'depName' => $dep['depName'],
                'rooms' => $roomCount,
                'beds' => $bedCount,
                'nurses' => $nurseCount,
            ];
            $deps[] = $newObject;
        }
        
        echo json_encode([
            'success' => 1,
            'data' => $deps,
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
