<?php
include "conn.php";
if(isset($_POST['id'])){
   $post=$_POST['id'];
   $id=explode(",",$post);
   $arr=array();
   for($i=0;$i<count($id);$i++){
       $res=$conn->query("select * from goods_all where id ={$id[$i]}");
       if($row=$res->fetch_assoc()){
            $arr[]=$row;
       }
      
    }
    echo json_encode($arr);
}