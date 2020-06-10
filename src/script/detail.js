//引入公共结构
!function(){
    $('#head').load('./connhead.html');
    $('#wrap').load("./conn.html");
    
}()


!function(){
    const $smallimgbox=$('.smallimg')
    const $smallimg=$('.smallimg img');
    const $smallshade=$('.smallshade');
    const $bigshade=$('.bigshade');
   

    //放大镜
    $smallimgbox.hover(function(){

        $smallshade.css({display:'block',
        //计算小放尺寸
            width: $smallimg.outerWidth() * $bigshade.outerWidth() /parseInt($bigshade.css('background-size').split(' ')[0]),
            height: $smallimg.outerHeight() * $bigshade.outerHeight() /parseInt($bigshade.css('background-size').split(' ')[1])
        })
        
        $bigshade.css({display:'block'
        })
       

        //计算比例
        let $bili = parseInt($bigshade.css('background-size').split(' ')[0])/ $smallimg.outerWidth();

        $(this).on('mousemove', function(e) {
            let leftvalue = e.pageX - $smallimgbox.offset().left - $smallshade.outerWidth() / 2;
            let topvalue = e.pageY - $smallimgbox.offset().top -$smallshade.outerHeight() / 2;
            if (leftvalue < 0) {
                leftvalue = 0
            } else if (leftvalue >= $smallimg.outerWidth() - $smallshade.outerWidth()) {
                leftvalue = $smallimg.outerWidth() - $smallshade.outerWidth();
            }

            if (topvalue < 0) {
                topvalue = 0
            } else if (topvalue >= $smallimg.outerHeight() - $smallshade.outerHeight()) {
                topvalue = $smallimg.outerHeight() - $smallshade.outerHeight();
            }
            //小放的移动
            $smallshade.css({
                left: leftvalue,
                top: topvalue
            });

            //大图的移动
            $bigshade.css({
                'background-position':`-${leftvalue*$bili}px -${topvalue*$bili}px`
            });
        });
    },function(){
        $smallshade.css({display:'none'})
        $bigshade.css({display:'none'})
    })

    //渲染
    let keyword= decodeURIComponent(location.search.substring(1).split('=')[1]); //解决乱码
    const $goodsname=$('.goods-name h1');//商品名字
    const $goodsprice=$('.goods-price span');///价格
    const $state=$('.services a');//商家
    const $goodsnumber=$('.inventory span');//库存
    const $prevbtn=$('a.prev');
    const $nextbtn=$('a.next'); 

    $.get('../php/detail.php?sid='+keyword,function(data){
        let res=JSON.parse(data);
        $goodsname.html(res.goods_name);
        $smallimg.attr('src',res.goods_img);

        $bigshade.css({'background':`url(${res.goods_img})no-repeat`,
        'background-size': '720px 720px',
        'background-position': '0px 0px',
        })

        $goodsprice.html(res.goods_price)
        $state.html(res.goods_state)
        $goodsnumber.html(res.goods_number)

        let imglist=(res.goods_img+','+res.piclistimg).split(',');

     
        if(imglist.length>5){ //小图超过5个显示左右按钮
            $prevbtn.css({visibility:'visible'}); 
            $nextbtn.css({visibility:'visible'});   
        }
        
        var str='<ul class=wrap>'
        for(let value of imglist){
           
            str+=`
                <li>
                <img src="${value}">
                </li>
            `
        }  
        str+='</ul>';

        $smallpicwrap.html(str);
        // console.log($smallpicwrap)
        const $imglist=$('ul.wrap');
        const $liwidth=$('ul.wrap li').width()+5;
        $imglist.css({position:'relative'})
        $imglist.width($liwidth*imglist.length);
        //左右按钮
        let block=true;
        
        $prevbtn.on('click',function(){
            if(parseInt($imglist.css('left'))<0){
                if(block){
                    block=false
                    $imglist.animate({
                        left:parseInt($imglist.css('left'))+$liwidth
                    },function(){
                        block=true;
                    })
                }
            }
        })
        $nextbtn.on('click',function(){
            if($imglist.width()-(-parseInt($imglist.css('left'))+$smallpicwrap.width()+5)>0){
                if(block){
                    block=false;
                    $imglist.animate({
                        left:parseInt($imglist.css('left'))-$liwidth
                    },function(){
                        block=true;
                    })
                }  
            }
        })

        
        $('.goods-smallpic li:first-child').addClass('active');
    })

    //小图切换
    const $smallpicwrap=$('.goods-smallpic');//小图
    $smallpicwrap.on('click','li',function(){
       
       let newsrc=$(this).children().attr('src');
       $(this).addClass('active').siblings().removeClass('active');
       $smallimg.attr('src',newsrc);
       $bigshade.css({'background-image':`url(${newsrc})`}); 
    })


    

}()


//加入购物车
!function($){
    const $addcar=$('.addbtn');
    let idlist=[]; 
    let numlist=[];
    const $count=$('#count');
    const $countplus=$('.num .add');
    const $countreduce=$('.num .reduce');
    const $inventory =$('.inventory span');
    let username;
    function localtoarray(){
        username=$.cookie('username');
        if (localStorage.getItem(username+'goodsid') && localStorage.getItem(username+'goodsnum')) {
            idlist =localStorage.getItem(username+'goodsid').split(','); 
            numlist = localStorage.getItem(username+'goodsnum').split(','); 
        } else {
            idlist = [];
            numlist = [];
        }
    }

    //数量加减
    
    $count.on('change',function(){
        if($inventory.text()!==''){
            if($count.val()==1){
                $countreduce.addClass('disable');
            }else{
                $countreduce.removeClass('disable');
            }
            if($(this).val()>=~~$inventory.text()){
                $(this).val($inventory.text());
                $countplus.addClass('disable');
            }else{
                $countplus.removeClass('disable');
            }
        }
        
    })
    
    $countreduce.on('click',function(){
        console.log($inventory.text());
        if($inventory.text()!==''){
            if($count.val()==1){
                $countreduce.addClass('disable');
            }else{
                $countreduce.removeClass('disable');
            }
    
            if($count.val()<=1){
                $count.val(1);
            }else{
                $count.val($count.val()-1);
            }
    
            if(~~$count.val()<$inventory.text()){
                $countplus.removeClass('disable');
            }
        }
    })

    $countplus.on('click',function(){
        if($inventory.text()!==''){
            if(~~$count.val()<$inventory.text()){
                $count.val(~~$count.val()+1);
            }else{
                $count.val($inventory.text());
                $countplus.addClass('disable');
            }
            
            if($count.val()!==1){
                $countreduce.removeClass('disable');
            };
        }
        
    })
    //加入购物车按钮
    
    $('.addbtn').on('click',function(){
        if(!$.cookie('username')){
            alert('请先登录用户');
            return;
        } 
       
        let sid=location.search.substring(1).split('=')[1];
        let index=$.inArray(sid, idlist);
        localtoarray();
        if ($.inArray(sid, idlist) !== -1){
            let count=parseInt(numlist[index])+parseInt($count.val());
            numlist[index] = count;
            localStorage.setItem(username+'goodsnum',numlist);
        } else{
            idlist.push(sid);
            localStorage.setItem(username+'goodsid',idlist);
            numlist.push($count.val());
            localStorage.setItem(username+"goodsnum",numlist);
        }

        $('.mycart .count').html(localStorage.getItem(username+'goodsid').split(',').length);
        alert('加入成功');
        
       
    })
    
}(jQuery)

