<?php

class operation{
    private $dbhost= 'localhost';
    private $dbname= 'hospital';
    private $username = 'root';
    private $password = '';

        public function dbcon(){
            try {
                $conn = new PDO('mysql:host='. $this->dbhost .';dbname='.$this->dbname,$this->username,$this->password);
                $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch(PDOException $e){
                echo"connection error" .$e->getMessage();
                exit;
            }
        }
}


?>