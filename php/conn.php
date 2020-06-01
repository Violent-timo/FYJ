<?php
header('content-type:text/html;charser=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DBNAME', 'store');
$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($conn->connect_errno){
    die('数据库连接错误'.$conn->connect_errno);
}

$conn->query('SET NAMES UTF8');