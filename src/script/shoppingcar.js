//加载头部
!function($){
    $('#header').load("./connhead.html");
    //,function(){$('.left').children().not('.back-home').css({display:'none'});}
}(jQuery)

//加载购物车
!function($){
    if(localStorage.getItem($.cookie('username')+"goodsid")){
        let username=$.cookie('username');
        const id=localStorage.getItem(username+"goodsid");
        const count=localStorage.getItem(username+'goodsnum').split(',');
        if(id&&count){
            $.post('../php/shoppingcar.php',{id:id},function(data){
                let res=JSON.parse(data);
                // console.log(res);
                for(let i=0;i<res.length;i++){
                    let $clonebox=$('.things:hidden').clone(true,true);
                    $clonebox.find('.thing-img img').attr('src',res[i].goods_img);
                    $clonebox.find('.name').html(res[i].goods_name);
                    $clonebox.find('.thing-price span').html(res[i].goods_price);
                    $clonebox.find('.money span').html(res[i].goods_price).attr({unitprice:res[i].goods_price});
                    $clonebox.find('.numtog input').val(count[i]).attr({id:res[i].id});
                    $clonebox.find('.numtog .reduce').attr({id:res[i].id});
                    $clonebox.find('.numtog .add').attr({id:res[i].id});
                    $clonebox.find('.removeself').attr({id:res[i].id});
                    $clonebox.css('display', 'block');
                    $('.buy-list').append($clonebox);
                }
        
                //判断数量按钮默认状态
                let $shownum=$('.things:visible').find('.numtog input');
                let $numreduce=$('.things:visible').find('.numtog .reduce');
        
                let $money=$('.things:visible').find('.money span');//钱
                $.each($shownum,function(index,value){
                    // console.log($shownum.eq(index).val(),$money.attr('unitprice'));
                    $money.eq(index).html(($shownum.eq(index).val()*$money.eq(index).attr('unitprice')).toFixed(2));
                    if(value.value>1){
                        $($numreduce[index]).removeClass('ban');
                    
                    }
                })
        
            })
        }
    }
    
}(jQuery)

//购物车局部功能
!function($){
    //全选
    const $buywrap=$('.buy-wrap');//容器
    const $checkallbtn=$('.checkall');//全选按钮

    const $choose_kinds=$('.choose-kinds span');//选择商品种类
    const $choose_amount=$('.choose-amount span');//选择商品的数量
    const $choose_total=$('.amount-total strong');//选择商品的总价
   
    
    //全选按钮
    $checkallbtn.on('click',function(){
        let allchecklen=$('.things:visible').find('input[type="checkbox"]').length; //商品列表长度
        $buywrap.find("input:checkbox").not($(this)).prop('checked',$(this).prop('checked'));
        if($(this).prop('checked')){
            $choose_kinds.html(allchecklen);
        }else{
            $choose_kinds.html('0');
        }
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());
    })

    //全删
    $('.delete').on('click',function(){
        let $checkgoods =$('.things:visible').find('input:checked');
        
        if(confirm('是否删除')){
            $.each($checkgoods,function(index,value){
                $(value).parent().remove();
                localStorageHandle($checkgoods.eq(index),'deleall');
            })
        }
       
        $choose_kinds.html($('.things:visible').find('input:checked').length);
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());  
    })
    //商品单选按钮
    $buywrap.on('click','.things input:checkbox',function(){
        let allchecklen=$('.things:visible').find('input[type="checkbox"]').length;
        let $checked= $('.things:visible').find('input:checked');
        if($checked.length==allchecklen){
            $checkallbtn.prop('checked',true);
        }else{
            $checkallbtn.prop('checked',false);
        } 
        $choose_kinds.html($checked.length);
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());    
    })

    //商品删除
    $buywrap.on('click','.things .removeself',function(){
        if(confirm('是否删除')){
            localStorageHandle($(this),'dele');
            $(this).parent().parent().remove();
        }
        $choose_kinds.html($('.things:visible').find('input:checked').length);
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());  
    })


    //数量加减按钮
        //减
    $buywrap.on('click','.numtog .reduce',function(){
        let $shownum=$('.things:visible').find('.numtog input');
        let $index=$('.things:visible').find('.numtog .reduce').index($(this));
        let $money=$('.things:visible').find('.money span');
        if(Number($shownum.eq($index).val())>1){
            localStorageHandle($(this),'-');
            $shownum.eq($index).val($shownum.eq($index).val()-1);
            $('.things:visible .numtog .add').eq($index).removeClass('ban')
        }else{
            $(this).addClass('ban')
            $shownum.eq($index).val('1');
            
        }
        //价格改变
        $money.eq($index).text(($shownum.eq($index).val()*$money.eq($index).attr('unitprice')).toFixed(2));
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());  
    })
    //加
    $buywrap.on('click','.numtog .add',function(){
        let $shownum=$('.things:visible').find('.numtog input');
        let $index=$('.things:visible').find('.numtog .add').index($(this));
        let $money=$('.things:visible').find('.money span');
        localStorageHandle($(this),'+');
        $shownum.eq($index).val(Number($shownum.eq($index).val())+1);
        if(Number($shownum.eq($index).val())>1){
            $(this).parent().find('.reduce').removeClass('ban')
        }
          //价格改变  
        $money.eq($index).text(($shownum.eq($index).val()*$money.eq($index).attr('unitprice')).toFixed(2));    
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());  
            
        
    })
   //商品input输入数量
   $buywrap.on('blur',".numtog input",function(){
       
        let $money=$('.things:visible').find('.money span');
        let $index=$('.things:visible .numtog input').index($(this)); 
        if($(this).val()<=1){
            $(this).val(1);
            $('.things:visible .reduce').eq($index).addClass('ban')
        }
        if($(this).val()>=999){
                $(this).val(999);
                $('.things:visible .add').eq($index).addClass('ban')
        }
        $money.eq($index).text(($(this).val()*$money.eq($index).attr('unitprice')).toFixed(2));
        localStorageHandle($(this),'plus',$(this).val())
        $choose_amount.html( goodsAmount());
        $choose_total.html(goodsAllPrice());  
   })
    //计算商品总数
    function goodsAmount(){
        let $goodsnum=$('.things:visible').find('.numtog input');//input数量
        let $goodscheckbt=$('.things:visible').find('input[type="checkbox"]');//input 选择
        let mount=0;
        $.each($goodsnum,function(index,item){
            if($goodscheckbt.eq(index).prop('checked')){
                mount+=Number(item.value);
            }
            
        })
        return mount;
    }

    //计算商品总价
    function goodsAllPrice(){

        let $goodsprice=$('.things:visible').find('.money span');//input数量
        let $goodscheckbt=$('.things:visible').find('input[type="checkbox"]');//input 选择
        let price=0;
        $.each($goodsprice,function(index,item){
            if($goodscheckbt.eq(index).prop('checked')){
                price+=Number(item.innerText);
            }
            
        })
        return price.toFixed(2);
    }
    //local操作
    function localStorageHandle(ele,type,num){
            
            var delid=ele.attr('id');
            var idlist=localStorage.getItem($.cookie('username')+'goodsid').split(',');
            var numlist=localStorage.getItem($.cookie('username')+'goodsnum').split(',');
            var delindex=idlist.indexOf(delid);
            
            if(type=='plus'){
                numlist[delindex]=num;
            }
            if(type=='dele'||type=='deleall'){
                idlist.splice(delindex,1);
                numlist.splice(delindex,1)
            }
            if(type=='+'){
                numlist[delindex]++;
            }
            if(type=='-'){
                numlist[delindex]--;
            }
            localStorage.setItem(($.cookie('username')+'goodsid'),idlist);
            localStorage.setItem(($.cookie('username')+'goodsnum'),numlist);
    }
}(jQuery)
