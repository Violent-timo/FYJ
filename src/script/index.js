//导入头部
!function(){
    $('#head').load("./connhead.html",function(){
        $('.back-home').css({display:'none'})

        //判断用户是否登录
        if($.cookie('username')){
            $('.unuse').css({display:'none'});
            $('.use').css({display:'block'});
            $('.use span').html($.cookie('username'))
        }
    })
    $('#wrap').load("./conn.html",function(){
        $('.all-list').css({
            display:'block',
            'background-color':"#6E6568",
            'box-shadow':'none'
        })
        $('.all-list .name a').css({
            color:'#fff',
        })
        $('.all-list .name span').css({
            color:'#fff',
        })
    });
    $('#toolbar').load('./toolbar.html');
}();


//live效果
!function(){
    const $liveimg=$('.firlive .live-special img');
    function move(){
        $liveimg.animate({
            width:'160',
            height:'160',
            left:'-70'
        },1800,'linear').animate({
            top:'-100'
        },2000,'linear').animate({
            left:'0'
        },1800,'linear').animate({
            top:'0'
        },2000,'linear').animate({
            width:'90',
            height:'59',
        },1800,'linear')
    };
    move();
    setInterval(function(){
        move();
   },11000)
}()


//秒杀专区
!function(){
    //渲染秒杀商品
    const $skillshow=$('#seckill ul');
    console.log($skillshow)
    $(document).ready(function(){
        $.get('../php/indexskill.php',function(data){
           
            let res=JSON.parse(data);
            $skillshow.css({width:res.length*200})
            for(let i=0;i<res.length;i++){
                var li=$('<li></li>');
                li.html(`<div class="goods">
                             <a href="javascript:;">
                                 <img src="${res[i].url}" >
                                 <p class="sk-name">${res[i].productname}</p>
                             </a>
                             <span class="sk-shadow"></span>
                         </div>
                         <p class="price">
                             <span class="newprice">￥${res[i].newprice}</span>
                             <span class="oldprice">￥${res[i].oldprice}</span>
                         </p>`);
               $skillshow.append(li);
            }
         })
    })
    
    //左右按钮事件
    const $prev=$('.prev');
    const $next=$('.next');
    var block=true;
    $prev.on('click',function(){
        if(block){
            block=false;
            slider('-');
        }
      
    })
    $next.on('click',function(){
        if(block){
            block=false;
            slider('+');
        }
        
     })
    function slider(compare){
        let ulleft=parseInt($skillshow.css('left'));
        let wrapwidth=$('.list-wrap').width();
        let shift=$skillshow.width()-Math.abs(ulleft)-wrapwidth+20;//可移动的距离
        console.log(shift)
        switch (compare){
            case "-":
                if(shift>200){
                    if(shift>=1200){
                        $skillshow.animate({
                            left:-6*200-10
                        },function(){
                            block=true;
                        })
                        console.log(block+'1')
                    }else{
                        $skillshow.animate({
                            left:-shift-10
                        },function(){
                            block=true;
                        })
                        console.log(block+'2')
                    }
                }else{
                    block=true;
                }
                
                break;
            case "+":
                if(shift<=0){
                    if(shift>wrapwidth){
                        $skillshow.animate({
                            left:6*200-10
                        },function(){
                            block=true;
                        })
                        console.log(block+'3')
                    }else{
                        $skillshow.animate({
                            left:shift-10
                        },function(){
                            block=true;
                        })
                        console.log(block+'4')
                    }
                }
                else{
                    block=true;
                }
                break ; 
                
        }
        
    }


    //倒计时
    const $h=$('.timer .h');
    const $m=$('.timer .m');
    const $s=$('.timer .s');
    setInterval(function(){
        let date=+new Date('2020-06-07');
        let nowdate=+new Date();
        let dif=date-nowdate;
        var h = String(parseInt(dif/1000/60/60)%24).padStart(2,0);
        var m = String(parseInt(dif/1000/60)%60).padStart(2,0);
        var s = String(parseInt(dif/1000)%60).padStart(2,0);
        $h.html(h);
        $s.html(s);
        $m.html(m);
    },1000)
}()
