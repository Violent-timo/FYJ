<?php
include 'conn.php';
   
    if(isset($_GET['tel'])){
      $code='';
      //随机6位数
      function randStr($len=6,$format='ALL') { 
         switch($format) { 
         case 'ALL':
         $chars='abcdefghijklmnopqrstuvwxyz0123456789'; break;
         case 'CHAR':
         $chars='abcdefghijklmnopqrstuvwxyz'; break;
         case 'NUMBER':
         $chars='0123456789'; break;
         default :
         $chars='abcdefghijklmnopqrstuvwxyz0123456789'; 
         break;
         }
         mt_srand((double)microtime()*1000000*getmypid()); 
         $password="";
         while(strlen($password)<$len)
            $password.=substr($chars,(mt_rand()%strlen($chars)),1);
         return $password;
         
        } 
      $code=randStr();  
      $tel=$_GET['tel']; 
      $conn->query("DELETE from mobilecode WHERE tel='$tel'");
      $conn->query("INSERT INTO mobilecode (tel,code)VALUES('$tel' ,'$code')");

      //   echo $code;
      //发送手机验证码
      $host = "http://codesms.market.alicloudapi.com";
      $path = "/sms/send/template/code/70";
      $method = "POST";
      $appcode = "11b3dc04ae214bdba2810effd1deea3e";
      $headers = array();
      array_push($headers, "Authorization:APPCODE " . $appcode);
      //测试请用默认短信模板,默认模板不可修改,如需自定义短信内容测试或正式发送,请联系旺旺或QQ1246073271进行申请
     $querys = array(
         "content" => "【摩字】您的验证码为$code ，您正在进行API调试，请于code1内完成验证，如非本人操作，请忽略此短信。",
         "mobile" => "$tel"
         );
      $querys= http_build_query($querys);
      $bodys = "";
      $url = $host . $path . "?" . $querys;
  
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($curl, CURLOPT_FAILONERROR, false);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_HEADER, true);
      if (1 == strpos("$".$host, "https://"))
      {
          curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
          curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
      }
      var_dump(curl_exec($curl));
   }

   if(isset($_GET['teltest'])){
      $tel=$_GET['teltest'];
      $res=$conn->query("select * from users where tel='$tel'");
      if($res->fetch_assoc()){
         echo true;
      }else{
         echo false;
      }
   }
   
   if(isset($_POST['tel'])&&isset($_POST['code'])){
      $tel=$_POST['tel'];
      $code=$_POST['code'];
      $res=$conn->query("select * from mobilecode WHERE tel='$tel' and code='$code'");
      if($res->fetch_assoc()){
         echo true;
      }else{
         echo false;
      }
   }

   if(isset($_POST['password'])&&isset($_POST['tel'])){
      $password=$_POST['password'];
      $tel=$_POST['tel'];
      $conn->query("insert into users (id,tel,username,password,email) values (null,'$tel',null,'$password',null)");
   
   }


?>