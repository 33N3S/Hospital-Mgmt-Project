<?php
error_reporting(E_ERROR);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,PUT");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json;charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');


require('db.php');
$database = new operation();
$conn = $database->dbcon();
$data=json_decode(file_get_contents("php://input"));

if(!isset($data->roomCount) || !isset($data->depName) ):
    echo json_encode([
        'success'=>0,
        'message'=>'must enter required fields'
    ]);
    exit;
elseif(empty($data->roomCount) || empty($data->depName) ):
    echo json_encode([
        'success'=>0,
        'message'=>'required fileds are empty'
    ]);
    exit;
endif;

try{
    $sql="INSERT INTO `department` (
        roomCount,
        depName
    )VALUES(
        :roomCount,
        :depName
    )";
    $stmt=$conn->prepare($sql);
    $stmt->bindValue(':roomCount',$data->roomCount);
    $stmt->bindValue(':depName',$data->depName,PDO::PARAM_STR);

    if($stmt->execute()){
        echo json_encode([
            'success'=>1,
            'message'=>"data entered successfully",
        ]);
    }
    else{
        echo json_encode([
            'success'=>0,
            'message'=>"data was not entered successfully",
        ]);
    }
}catch(PDOException $e){
    http_response_code(500);
    echo json_encode([
        'success' => 0,
    ]);}
?>