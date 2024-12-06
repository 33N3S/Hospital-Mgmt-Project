<?php
error_reporting(E_ERROR);

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


$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING);

try{
    $sql="SELECT cinPatient,first_namep,last_namep,notep,statep,historyp,sexp,naissancep,contactp,passwordrelative,relativep,depName,doc.numDoc,n.nurseNum,r.roomNum,b.bedNum FROM patient p,beds b,room r,nurses n,doctor doc,department d where cinPatient = :id and b.bedNum=p.bedNum and b.roomNum=r.roomNum and r.nurseNum=n.nurseNum and n.numDoc=doc.numDoc and doc.depNum=d.depNum";
    $stmt=$conn->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    if ($stmt->rowCount() > 0){
        $data=$stmt->fetch(PDO::FETCH_ASSOC);
        $hist=$data["historyp"];
        $data["historyp"]=unserialize($hist);
        
        $docsql="SELECT doc.first_nameD,doc.last_nameD from department d,doctor doc,nurses n,room r,beds b where b.bedNum=:bed and b.roomNum=r.roomNum and r.nurseNum=n.nurseNum and n.numDoc=doc.numDoc limit 1";
        $depsql="SELECT depName from department d,doctor doc,nurses n,room r,beds b where b.bedNum=:bed and b.roomNum=r.roomNum and r.nurseNum=n.nurseNum and n.numDoc=doc.numDoc limit 1";
        $docstmt=$conn->prepare($docsql);
        $depstmt=$conn->prepare($depsql);
        $docstmt->bindValue(':bed', $data['bedNum'], PDO::PARAM_STR);
        $depstmt->bindValue(':bed', $data['bedNum'], PDO::PARAM_STR);
        $docstmt->execute();
        $depstmt->execute();
        $doc=$docstmt->fetch(PDO::FETCH_ASSOC);
        $dep=$depstmt->fetch(PDO::FETCH_ASSOC);

        $response = json_encode([
            'success'=>1,
            'data'=>$data,
            'doc'=>$doc,
            'dep'=>$dep
        ]);
        echo $response;
        exit;
    }
    if($stmt->rowCount() <= 0){
        $response = json_encode([
            'success'=>0,
            'message'=>"no occurance found"
        ]);
        echo $response;
        exit;
    }

}catch (PDOException $e) {
    http_response_code(500);
    $response = json_encode([
        'success' => 0,
        'message' => $e->getMessage(),
    ]);
    echo $response;
    exit;
}
?>
