<?php
include 'conn.php';
$res=$conn->query('select * from seckill');
$arr=array();
while($row=$res->fetch_assoc()){
    $arr[]=$row;
}
echo json_encode($arr);