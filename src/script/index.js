//导入头部
!function($){
    $('#head').load("./connhead.html",function(){
        $('.back-home').css({display:'none'})
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
        });
        
    });
    $('#toolbar').load('./toolbar.html',function(){
         //判断用户是否登录
         if($.cookie('username')){ 
            $('.info .name').html($.cookie('username'));
        }
    });
}(jQuery);


//live效果
!function($){
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
}(jQuery)


//轮播图
!function($){
    const $prev=$('.left .prev');
    const $next=$('.left .next');
    const $imglist=$('.left ul li');
    const $btnlist=$('.left  ol li');
    const $wrap=$('.left ');
    let timer=null;
    let index=0;
    auto();
    $wrap.hover(function(){
        clearInterval(timer);
    },function(){
        auto();
    })
    $next.on('click',function(){
        index++;
        slide();
    })
    $prev.on('click',function(){
        index--;
        slide();
    })
    $btnlist.on('click',function(){
        index=$(this).index();
        $(this).addClass('focus').siblings().removeClass('focus');
        slide();
    })
    function auto(){
        timer=setInterval(function(){
            index++;
            slide();
        },3000)
    }
    function slide(){
        if(index>$imglist.length-1){
            index=0;
        }
        if(index<0){
            index=$imglist.length-1;
        }
        $imglist.eq(index).css({
            opacity:1,
            transition:'0.5s'
        }).siblings().css({
            opacity:0,
            transition:'0.5s'
        })
        $btnlist.eq(index).addClass('focus').siblings().removeClass('focus');
    }
}(jQuery)

//秒杀专区
!function($){
    //渲染秒杀商品
    const $skillshow=$('#seckill ul');
    
    $.get('../php/indexskill.php',function(data){
        
        let res=JSON.parse(data);
        $skillshow.css({width:res.length*200})
        let str=''
        for(let i=0;i<res.length;i++){
            str+=`<li><div class="goods">
            <a href="javascript:;">
                <img src="${res[i].url}" >
                <p class="sk-name">${res[i].productname}</p>
                     </a>
                <span class="sk-shadow"></span>
                </div>
                <p class="price">
                    <span class="newprice">￥${res[i].newprice}</span>
                    <span class="oldprice">￥${res[i].oldprice}</span>
                </p></li>`
            }
            $skillshow.html(str);
        })
    
    
    //左右按钮事件
    const $prev=$('.kill-content .prev');
    const $next=$('.kill-content .next');
    var block=true;
    $prev.on('click',function(){
        if(block){
            block=false;
            slider('+');
        }
      
    })
    $next.on('click',function(){
        if(block){
            block=false;
            slider('-');
        }
        
     })
    function slider(compare){
        let ulleft=parseInt($skillshow.css('left'));
        let wrapwidth=$('.list-wrap').width();
        let shift=$skillshow.width()-Math.abs(ulleft)-wrapwidth+20;//可移动的距离
       
        console.log(shift)
        switch (compare){
            case "-":
                if(shift>0){
                    if(shift>=1200){
                        $skillshow.animate({
                            left:parseInt($skillshow.css('left'))-6*200
                        },function(){
                            console.log($skillshow.css('left'))
                            block=true;
                        })
                    }else{
                        $skillshow.animate({
                            left:parseInt($skillshow.css('left'))-shift
                        },function(){
                            block=true;
                        })
                    }
                }else{
                    block=true;
                }
                
                break;
            case "+":
                if(ulleft<-10){
                    if(ulleft<=-1210){
                        $skillshow.animate({
                            left:parseInt($skillshow.css('left'))+1200
                        },function(){
                            console.log($skillshow.css('left'))
                            block=true;
                        })
                    }else{
                        $skillshow.animate({
                            left:parseInt($skillshow.css('left'))-ulleft-10
                        },function(){
                            block=true;
                        })
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
        let date=+new Date('2020-06-08 13:26:00');
        let nowdate=+new Date();
        let dif=date-nowdate;
        var h = String(parseInt(dif/1000/60/60)%24).padStart(2,0);
        var m = String(parseInt(dif/1000/60)%60).padStart(2,0);
        var s = String(parseInt(dif/1000)%60).padStart(2,0);
        if(dif<0){
            $h.html('00');
            $s.html('00');
            $m.html('00');
        }else{
            $h.html(h);
            $s.html(s);
            $m.html(m);
        }
        
    },1000)
}(jQuery)


//猜你喜欢
!function($){
    const $related=$('.relateditem ul');
    $.get('../php/indexrelated.php ',function(data){
        let res=JSON.parse(data);
        let str=''
        for(let value of res){
            str+=`<li>
            <a href="javascript:;">
                <div class="imgwrap">
                    <img data-original="${value.url}" class="lazy">
                </div>
                
                <div class="item-info">
                    <p class="info-name">${value.title}
                    </p>
                    <p class="info-price">
                    <span>￥</span><span class="price">${value.price}</span> 
                    </p>
                </div>
            </a>
            </li>
            `
              
        }
            $related.html(str); 
            let $imgs=$('.lazy');
            $imgs.lazyload({
                effect: "fadeIn"
            })
    })
}(jQuery)


// //搜索



