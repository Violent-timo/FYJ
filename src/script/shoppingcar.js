//加载头部
!function(){
    $('#header').load("./connhead.html");
    //,function(){$('.left').children().not('.back-home').css({display:'none'});}
}()

//加载购物车
!function($){
    let username=$.cookie('username');
    const id=localStorage.getItem(username+"goodsid");
    const count=localStorage.getItem(username+'goodsnum').split(',');
    $.post('../php/shoppingcar.php',{id:id},function(data){
        let res=JSON.parse(data);
        // console.log(res);
        for(let i=0;i<res.length;i++){
            let $clonebox=$('.things:hidden').clone(true,true);
            $clonebox.find('.thing-img img').attr('src',res[i].goods_img);
            $clonebox.find('.name').html(res[i].goods_name);
            $clonebox.find('.money span').html(res[i].goods_price).attr({unitprice:res[i].goods_price});
            $clonebox.find('.numtog input').val(count[i]);
            $clonebox.find('.numtog .reduce').attr({id:res[i].id});
            $clonebox.find('.numtog .add').attr({id:res[i].id});
            $clonebox.find('.removeself').attr({id:res[i].id});
            $clonebox.css('display', 'block');
            $('.buy-list').append($clonebox);
        }

        //判断数量按钮默认状态
        let $shownum=$('.things').not('.things:hidden').find('.numtog input');
        let $numreduce=$('.things').not('.things:hidden').find('.numtog .reduce');

        let $money=$('.things').not('.things:hidden').find('.money span');//钱
        $.each($shownum,function(index,value){
            if(value.value>1){
                $($numreduce[index]).removeClass('ban');
            }
        })

    })
}(jQuery)

//购物车局部功能
!function($){
    //全选
    const $buywrap=$('.buy-wrap');
    const $checkallbtn=$('.checkall');
    //全选按钮
    $checkallbtn.on('click',function(){
        $buywrap.find("input:checkbox").not($(this)).prop('checked',$(this).prop('checked'));
    })
    //商品单选按钮
    $buywrap.on('click','.things input:checkbox',function(){
        let allchecklen=$('.things').not('.things:hidden').find('input[type="checkbox"]').length;
        let $checked= $('.things').not('.things:hidden').find('input:checked');
        if($checked.length==allchecklen){
            $checkallbtn.prop('checked',true);
        }else{
            $checkallbtn.prop('checked',false);
        }
    })

    //商品删除
    $buywrap.on('click','.things .removeself',function(){
        if(confirm('是否删除')){
            localStorageHandle($(this),'dele');
            $(this).parent().parent().remove();
        }
    })


    //数量加减按钮
        //减
    $buywrap.on('click','.numtog .reduce',function(){
        let $shownum=$('.things').not('.things:hidden').find('.numtog input');
        let $index=$('.things').not('.things:hidden').find('.numtog .reduce').index($(this));
        let $money=$('.things').not('.things:hidden').find('.money span');
       console.log( $money.eq($index).attr('unitprice'));
        if(~~$shownum.eq($index).val()>1){
            localStorageHandle($(this),'-');
            $shownum.eq($index).val($shownum.eq($index).val()-1);
            
        }else{
            $(this).addClass('ban')
            $shownum.eq($index).val('1');
            
        }
        //价格改变
        // $money.eq($index).text(~~$shownum.eq($index).val()*$money.eq($index).text());
    })
    //加
    $buywrap.on('click','.numtog .add',function(){
        let $showprice=$('.things').not('.things:hidden').find('.numtog input');
        let $index=$('.things').not('.things:hidden').find('.numtog .add').index($(this));
        
            localStorageHandle($(this),'+');
            $showprice.eq($index).val(~~$showprice.eq($index).val()+1);
            if(~~$showprice.eq($index).val()>1){
                $(this).parent().find('.reduce').removeClass('ban')
            }
            
            
        
    })

    function localStorageHandle(ele,type){
            let delid=ele.attr('id');
            let idlist=localStorage.getItem($.cookie('username')+'goodsid').split(',');
            let numlist=localStorage.getItem($.cookie('username')+'goodsnum').split(',');
            let delindex=idlist.indexOf(delid);
            if(type=='dele'){
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
