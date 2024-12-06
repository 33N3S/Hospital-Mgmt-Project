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
    $sql = "SELECT depNum,depName FROM `department` order by depNum";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $pcsql = "SELECT d.depName,COUNT(bedNum) as patientCount FROM room r, department d, beds b WHERE b.roomNum=r.roomNum AND r.depNum=d.depNum AND b.bedEmpty=0 GROUP BY d.depNum";
        $stmt = $conn->prepare($pcsql);
        $stmt->execute();
        $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $ncsql = "SELECT d.depName, COUNT(n.nurseNum) as nurseCount FROM department d, doctor doc, nurses n WHERE doc.depNum=d.depNum AND n.numDoc=doc.numDoc GROUP BY d.depNum";
        $stmt = $conn->prepare($ncsql);
        $stmt->execute();
        $nurses = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $deps = [];
        foreach ($data as $index => $dep) {

            $patientCount = isset($patients[$index]['patientCount']) ? $patients[$index]['patientCount'] : 0;
            $nurseCount = isset($nurses[$index]['nurseCount']) ? $nurses[$index]['nurseCount'] : 0;
            $newObject = [
                'depName' => $dep['depName'],
                'patients' => $patientCount,
                'nurses' => $nurseCount,
            ];
            $deps[] = $newObject;
        }

        $docsql = "SELECT COUNT(numDoc) FROM doctor";
        $stmt = $conn->prepare($docsql);
        $stmt->execute();
        $docnum = $stmt->fetchColumn();

        $nursql = "SELECT COUNT(nurseNum) FROM nurses";
        $stmt = $conn->prepare($nursql);
        $stmt->execute();
        $nurnum = $stmt->fetchColumn();

        $patsql = "SELECT COUNT(cinPatient) FROM patient WHERE bedNum IS NOT NULL";
        $stmt = $conn->prepare($patsql);
        $stmt->execute();
        $patnum = $stmt->fetchColumn();

        $bedsql = "SELECT COUNT(bedNum) FROM beds";
        $stmt = $conn->prepare($bedsql);
        $stmt->execute();
        $bednum = $stmt->fetchColumn();

        $liveNums = [
            'docs' => (int)$docnum,
            'nurses' => (int)$nurnum,
            'patients' => (int)$patnum,
            'beds' => (int)$bednum,
        ];


        echo json_encode([
            'success' => 1,
            'liveNums' => $liveNums,
            'deps'=> $deps,
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
