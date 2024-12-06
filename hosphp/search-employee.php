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
$firstName = filter_input(INPUT_GET, 'first', FILTER_SANITIZE_STRING);
$lastName = filter_input(INPUT_GET, 'last', FILTER_SANITIZE_STRING);
try {
    $sql = "
    SELECT * FROM (
    SELECT first_namea AS first, last_namea AS last FROM admin
    UNION ALL
    SELECT first_nameD AS first, last_nameD AS last FROM doctor
    UNION ALL
    SELECT first_nameN AS first, last_nameN AS last FROM nurses
  ) AS combined
  WHERE CONCAT(last, ' ', first) LIKE :name OR CONCAT(first, ' ', last) LIKE :name";

    // Prepare and execute the statement with parameter binding
    $stmt = $conn->prepare($sql);
    $stmt->execute(['name' => "%$firstName% $lastName%"]);
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
