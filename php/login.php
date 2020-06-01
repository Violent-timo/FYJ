<?php
include 'conn.php';

if(isset($_POST['username'])&&!isset($_POST['password'])){
    $username=$_POST['username'];
    $res=$conn->query("select * from users where tel='$username' or username='$username' or email='$username' ");
    if($res->fetch_assoc()){
        echo 1;
    }else{
        echo '';
    }
}


if(isset($_POST['username'])&&isset($_POST['password'])){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $res=$conn->query("select * from users where tel='$username' and password='$password' or username='$username' and password='$password'or email='$username'and password='$password' ");
    if($res->fetch_assoc()){
        echo 1;
    }else{
        echo '';
    }
}