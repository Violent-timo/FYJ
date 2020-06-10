//加载头部
!function(){
    $('#header').load("./connhead.html");
    //,function(){$('.left').children().not('.back-home').css({display:'none'});}
}()

//加载购物车
!function(){
    const id=localStorage.getItem("goodsid");
    const count=localStorage.getItem('goodsnum').split(',');
    $.post('../php/shoppingcar.php',{id:id},function(data){
        let res=JSON.parse(data);
        console.log(res);
        for(let i=0;i<res.length;i++){
            let $clonebox=$('.things:hidden').clone(true,true);
            $clonebox.find('.thing-img img').attr('src',res[i].goods_img);
            $clonebox.find('.name').html(res[i].goods_name);
            $clonebox.find('.money span').html(res[i].goods_price);
            $clonebox.find('.numtog input').val(count[i]);
            $clonebox.css('display', 'block');
            $('.buy-list').append($clonebox);
        }
        
        
        
    })
}()