<?php
include 'conn.php';
function _get($str){ 
    $val = !empty($_GET[$str]) ? $_GET[$str] : null; 
    return $val; 
    }
if(_get('key')){
    $key= _get('key');
    echo "
        <script>
            location.href='http://10.31.162.14/Zshoppro/src/list.html?key=$key'
        </script>
    ";
}
if($_POST['keyword']){
    $keyword=$_POST['keyword'];
    $res=$conn->query("select * from goods_all where goods_name like '%$keyword%' or goods_class like '%$keyword%'");
    $arr=array();
    while($row=$res->fetch_assoc()){
        $arr[]=$row;
    }
    echo json_encode($arr);
}