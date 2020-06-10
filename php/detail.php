<?php
include 'conn.php';
if(isset($_GET['sid'])){
    $id=$_GET['sid'];
    $res=$conn->query("select * from goods_all where id=$id");
    echo json_encode($res->fetch_assoc());
}