(function($){
    // const $userbtn=$('.togbtn').children().first().children();
    // const $phonebtn=$('.togbtn').children().last().children();
    // const $useform=$('.loginform');
    // const $phoneform=$('.mobileform');
    const $togbtn=$('.togbtn').children();
    const $togform=$('form');
    const $err=$('.error');
    console.log($err);
    //登录方式切换
    $togbtn.on('click',function(){
        $(this).children().addClass('active');
        $togform.eq($(this).index()).css({
            'display':'block'
        }).siblings('form').css({
            display:'none',
        })
        $(this).siblings().children().removeClass('active');
    })

    //用户名登录
    const $username=$('.loginform .user input');
    const $password=$('.loginform .password input');
    const $loginbtn=$('.loginBtn');

    //用户名失去焦点判断 用户名是否存在
    $username.on('blur',function(){
        $.post('http://10.31.162.14/Zshoppro/php/login.php',{
            'username':$(this).val()},
            function (data) {
                if(data==='1'){
                    $err.css({display:'none'});
                }else{
                    $err.css({display:'block'});
                    $username.val('');
                }
            });
      
    })

    //点击登录 判断用户名密码是否匹配
    $loginbtn.on('click',function(){
        if($username.val()&&$password.val()){
             $.post('http://10.31.162.14/Zshoppro/php/login.php',{
            'username':$username.val(),
            'password':$password.val()
        },
            function (data) {
                if(data==='1'){
                    $.cookie('username',$username.val());
                    alert('登录成功');
                    location.href='index.html';
                }else{
                    alert('密码输入错误，请重新输入');
                    $password[0].focus();
                    $password.val('');
                }
            });
        }
    })
   
    
})(jQuery);



//注册按钮
(function($){
    const $register=$('.foot .right a');
    $register.on('click',function(){
        location.href='register.html';
    })
})(jQuery);