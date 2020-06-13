!function(){
    let reg=/^1[34578]\d{9}$/; //匹配手机号格式是否正确


    //第一个form表单取值
    const $firstForm=$('.firstForm');
    const $tel=$('.firstForm dd input');
    const $telerr=$('.firstForm .phone label');
    const $agree=$('.clause input');
    const $agreeerr=$('.clause label');
    const $getCodeBtn=$('.regist-slider');

    
    const $getmobilemsg=$('.mobilemsg input');//第二个表单利用input属性获取号码
 
    //手机号输入失去焦点判断格式是否正确 手机号是否已经被注册
    let tellock=false;
    $tel.on('blur',function(){
        if(reg.test($tel.val())){
            $telerr.css({
                display:'none'
            })
            $.get('http://10.31.162.14/Zshoppro/php/register.php','teltest='+$tel.val(),function(data){
                if(data!=='1'){
                    tellock=true;
                }else{
                    $telerr.css({
                        display:'block'
                    }).html('该手机号已经注册');
                    
                }
            })
        }else{
            $telerr.css({
                display:'block'
            })
            $telerr.html("请输入正确的手机号");
            $tel.val('');
            $tel[0].focus();
        }
    })
   


    //点击发送验证码 判断协议  号码是否正确
    $getCodeBtn.on('click',function(e){
        if(tellock){
            let telnum=$tel.val();
            if(reg.test(telnum)){
                if($agree.prop('checked')){
                    $getmobilemsg.attr('tel',telnum);
                    secondActive();
                    $agreeerr.css({display:'none'});
                    $.get('http://10.31.162.14/Zshoppro/php/register.php','tel='+telnum,function(data){
                        // console.log(data);
                    })
                    tellock=false;
                }else{
                    $agreeerr.css({display:'block'});
                    
                }
            }
        }else{
            console.log('不可以')
        }
    })

    //第二个form表单取值
    const $secondForm=$('.secondForm');
    const $showmobilemsg=$('.mobilemsg span');


    let timer=null;//定时器
    let time=60;//倒计时60s后可以重新发送
    const $count_down=$('.count-down strong');//倒计时容器
    const $getagain=$('.getagain');//重新获取验证码按钮

    const $encode=$('.encode input');
    const $encodeerr=$('.encode .error');

    const $password=$('.setpassword input');
    const $passworderr=$('.setpassword .error')
    console.log($passworderr)
    const $repassword=$('.repassword input');
    const $repassworderr=$('.repassword .error');

    const $subbtn=$('.submitBtn button');   
    function secondActive(){
        $firstForm.css({display:'none'});//第一个form隐藏
        $secondForm.css({display:'block'})//第二个显示
        $showmobilemsg.html("短信已发送至"+$tel.val().replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')+"，请在10分钟内完成验证");//号码显示

        //倒计时
        $count_down.html(time);
        timer=setInterval(function(){
            time--;
            $count_down.html(time);
            if(time<=0){
                $count_down.parent().css({display:'none'});
                $getagain.css({display:'block'});
                clearInterval(timer);
                time=5;
            }
        },1000)
    }

    //验证码输入框失去焦点
    let codelock=false;
    $encode.on('blur',function(){
        if($encode.val().length===6){
            $.post('http://10.31.162.14/Zshoppro/php/register.php',{
                'tel':$getmobilemsg.attr('tel'),
                'code':$encode.val()
            },function(data){
                if(data==='1'){
                    codelock=true;
                    $encodeerr.css({display:'none'})
                }else{
                    codelock=false;
                    $encodeerr.css({display:'block'}).html('请输入正确的验证码')
                }
            });
        }else{
            $encodeerr.css({display:'block'}).html('请输入正确的验证码');
            codelock=false;
        }
       
    })

    
    //重新发送
    $getagain.on('click',function(){
        $secondForm.css({display:'none'});
        $firstForm.css({display:'block'});
        
        $getagain.css({display:'none'});
        $count_down.parent().css({display:'inline'});
    })

    //密码和repassword

    let repasblock=false;
    $repassword.on('blur',function(){
        if($repassword.val()===$password.val()){
           $repassworderr.css({display:'none'});
           repasblock=true;
        }else{
            repasblock=false;
            $repassworderr.css({display:'block'}).html('两次密码不一致');
        }
    })
    //判断密码强度
    const $grade=$('.grade');
    let pasblock=false;
    let regnum = /\d+/;
    let regupper = /[A-Z]+/;
    let reglower = /[a-z]+/;
    let regother = /[\W\_]+/;
    $password.on('input',function(){
        let $pass=$(this).val()
        let gradecount=0;
        $passworderr.css({display:'none'});
        if($pass.length>=6){
            if (regnum.test($pass)) {
                gradecount++;
            }
    
            if (regupper.test($pass)) {
                gradecount++;
            }
    
            if (reglower.test($pass)) {
                gradecount++;
            }
    
            if (regother.test($pass)) {
                gradecount++;
            }
            switch (gradecount) {
                case 1:
                    $grade.html('弱').css({
                        color: 'red'
                    });
                    break
    
                case 2:
                case 3:
                    $grade.html('中').css({
                        color: 'yellow'
                    });
                    break
                    
                case 4:
                    $grade.html('强').css({
                        color: 'green'
                    });
                    break
                    
            }
            if(gradecount>=2){
                pasblock=true
            }else{
                pasblock=false
            }
        }else{
            $grade.html('');
            pasblock=false;
        }

    })
    $password.on('blur',function(){
        if($(this).val().length<6){
            $passworderr.css({display:'block'}).html('密码长度过短');
            pasblock=false;
        }else if($(this).val().length>20){
            $passworderr.css({display:'block'}).html('密码长度过长');
            pasblock=false;
        }else{
            pasblock=true;
        }

    })
    //注册按钮
    $subbtn.on('click',function(){
        if(!repasblock){
            $repassworderr.css({display:'block'}).html('密码错误');
        }
        if(!codelock){
            $encodeerr.css({display:'block'}).html('验证码错误');
        }
        if(!pasblock){
            $passworderr.css({display:'block'}).html('密码错误');
        }
        console.log(codelock,repasblock)
        if(codelock&&repasblock&&pasblock){
            $.post('http://10.31.162.14/Zshoppro/php/register.php',
            {'password':$password.val(),
              'tel':$getmobilemsg.attr('tel'),  
            });
            
            repasblock=false;
            codelock=false;
            pasblock=false;
            alert('注册成功');
            location.href='login.html';
        }
        return false;
    })

    
}()