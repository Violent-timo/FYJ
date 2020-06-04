//导入头部
!function(){
    const $wrap=$('#wrap');
    const $head=$('#head');
    $head.load("./connhead.html",function(){
        $('.back-home').css({display:'none'})
    })
    $wrap.load("./conn.html",function(){
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

