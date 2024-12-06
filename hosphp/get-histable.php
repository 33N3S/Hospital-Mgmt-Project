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
    $sql = "SELECT cinPatient, historyp, statep FROM patient";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $objectsArray = [];
       
        foreach ($data as $patient) {
            $history = unserialize($patient['historyp']);
            if (is_array($history)) {
                foreach ($history as $tuple) {
                    foreach ($tuple as $index => $elt) {
                        if ($index === 0) {
                            $action = 'in';
                        }
                        else{
                            $action = 'out';
                        }
                        $newObject = [
                            'cinPatient' => $patient['cinPatient'],
                            'statep' => $patient['statep'],
                            'historyp' => $elt,
                            'action' => $action,
                        ];
                        $objectsArray[] = $newObject;
                    }
                }
            }
        }
        

        echo json_encode([
            'success' => 0,
            'data' => $objectsArray,
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
