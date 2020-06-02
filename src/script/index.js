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