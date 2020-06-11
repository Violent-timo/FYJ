!function(){
    $('#head').load("./connhead.html")
    $('#wrap').load('./conn.html');
    $('#toolbar').load('./toolbar.html',function(){
        if($.cookie('username')){ 
            $('.info .name').html($.cookie('username'));
        }
    });
}();


//渲染列表页

!function ($) {
    if(!location.search.substring(1)){
        let array_default = [];//排序前的li数组
        let array = [];//排序中的数组
        let prev = null;
        let next = null;
        //1.渲染列表页的数据-默认渲染第一页
        const $list = $('.list-wrap');
        $.ajax({
            url: 'http://10.31.162.14/Zshoppro/php/list.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                render(value);
            });

            //添加懒加载
            $(function () {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });

            array_default = [];//排序前的li数组
            array = [];//排序中的数组
            prev = null;
            next = null;
            //将页面的li元素加载到两个数组中
            $('.list-wrap li').each(function (index, element) {
                array[index] = $(this);
                array_default[index] = $(this);
            });
        });
        //渲染的外部无法获取内部的元素对象，通过事件委托实现。

        //2.分页思路
        //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
        
        $('.page').pagination({
            pageCount: 11,//总的页数
            jump: true,//是否开启跳转到指定的页数，布尔值。
            coping: true,//是否开启首页和尾页，布尔值。
            prevContent: '上一页',
            nextContent: '下一页',
            homePage: '首页',
            endPage: '尾页',
            callback: function (api) {
                $list.empty();
                console.log(api.getCurrent());//获取的页码给后端
                $.ajax({
                    url: '../php/list.php',
                    data: {
                        page: api.getCurrent()
                    },
                    dataType: 'json'
                }).done(function (data) {
                    $.each(data, function (index, value) {
                    
                        render(value);
                        let $imgs=$('.lazy');
                        $imgs.lazyload({
                            effect: "fadeIn"
                        })
                    });

                    array_default = [];//排序前的li数组
                    array = [];//排序中的数组
                    prev = null;
                    next = null;

                    //将页面的li元素加载到两个数组中
                    $('.list-wrap li').each(function (index, element) {
                        array[index] = $(this);
                        array_default[index] = $(this);
                    });
                })
            }
        });


        //按钮
        $('.array li').on('click',function(){
            $(this).children().addClass('a-active');
            $(this).siblings().children().removeClass('a-active');
        })
        //3.排序
        $('.default').on('click', function () {
            $.each(array_default, function (index, value) {
                $('.list-wrap ').append(value);
            });
            $('a.price').find('i').css({'background-position': '0 -380px'});
            return;
        });
        $('a.price').on('click',function(){
            if($(this).attr('price')=='down'){
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.now-price').html());
                        next = parseFloat(array[j + 1].find('.now-price').html());
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                //清空原来的列表，将排序后的数据添加上去。
                //empty() : 删除匹配的元素集合中所有的子节点。
                // $('.list ul').empty();//清空原来的列表
                $.each(array, function (index, value) {
                    // console.log(value);
                    $list.append(value);
                });

                $(this).attr('price','up');
                $(this).find('i').css({'background-position': '0 -380px'})
                
            }else if($(this).attr('price')=='up'){
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        console.log(array[j].find('.now-price').html());
                        prev = parseFloat(array[j].find('.now-price').html());
                        next = parseFloat(array[j + 1].find('.now-price').html());
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                //清空原来的列表，将排序后的数据添加上去。
                //empty() : 删除匹配的元素集合中所有的子节点。
                // $('.list ul').empty();//清空原来的列表
                $.each(array, function (index, value) {
                    // console.log(value);
                    $list.append(value);
                });

                $(this).attr('price','down');
                $(this).find('i').css({'background-position': '0 -224px'})
            }
        })

        function render(value){
            let li=$('<li></li>');
            li.html(`
                <div class="goods-content">
                    <div class="goods-pic">
                        <a href="detail.html?sid=${value.id}"><img class='lazy' data-original="${value.goods_img} "></a>
                    </div>
                    <div class="goods-info">
                        <div class="p-price">
                            <p><span>￥</span><span class='now-price'>${value.goods_price}</span><i>限时折扣</i></p>
                        </div>
                        <div class="p-name">
                            <a href="javascript:;">
                                
                                <p>${value.goods_name}</p>
                            </a>
                        </div>
                        <div class="p-commit">
                            <strong class="sell">
                                <a href="javascript:;">${value.goods_number}</a>
                                笔成交
                            </strong>
                            <strong class="remark">
                                <a href="javascript:;">0</a>
                                评论
                            </strong>
                        </div>
                        <div class="p-shop">
                            <span>
                                <a href="javascript:;">${value.goods_state}</a>
                            </span>
                        </div>
                        <div class="p-icons">
                            <i>自营</i>
                        </div>
                        <div class="p-operate">
                            <div class="btn focus">
                                <a href="javascript:;">收藏
                                    <i></i>
        
                                </a>
                                <a href="javascript:;" class="active">
                                    <span></span>
                                </a>
                            </div>
                            <div class="btn addcar">
                                <a href="javascript:;">加入购物车
                                    <i></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $list.append(li);
            
        }
        window.render=render;
    }

}(jQuery);

//渲染首页搜索的关键词
!function($){
    let keyword= decodeURIComponent(location.search.substring(1).split('=')[1]); //解决乱码
    const list_wrap=$('ul.list-wrap');

    $.post('../php/indexsearch.php',{keyword:keyword},function(data){
        let res=JSON.parse(data);
        let str='';
        $.each(res,function(index,value){
            str+=`<li>
            <div class="goods-content">
                <div class="goods-pic">
                <a href="detail.html?sid=${value.id}"><img class='lazy' data-original="${value.goods_img} "></a>
                </div>
                <div class="goods-info">
                    <div class="p-price">
                        <p><span>￥</span><span class='now-price'>${value.goods_price}</span><i>限时折扣</i></p>
                    </div>
                    <div class="p-name">
                        <a href="javascript:;">
                            
                            <p>${value.goods_name}</p>
                        </a>
                    </div>
                    <div class="p-commit">
                        <strong class="sell">
                            <a href="javascript:;">${value.goods_number}</a>
                            笔成交
                        </strong>
                        <strong class="remark">
                            <a href="javascript:;">0</a>
                            评论
                        </strong>
                    </div>
                    <div class="p-shop">
                        <span>
                            <a href="javascript:;">${value.goods_state}</a>
                        </span>
                    </div>
                    <div class="p-icons">
                        <i>自营</i>
                    </div>
                    <div class="p-operate">
                        <div class="btn focus">
                            <a href="javascript:;">收藏
                                <i></i>

                            </a>
                            <a href="javascript:;" class="active">
                                <span></span>
                            </a>
                        </div>
                        <div class="btn addcar">
                            <a href="javascript:;">加入购物车
                                <i></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div></li>
        `
        })
        $('.list-wrap').append(str);
        let $imgs=$('.lazy');
            $imgs.lazyload({
                effect: "fadeIn"
        })
    }) 
}(jQuery)



//加入购物车
// !function($){
//     let idlist=[]; 
//     let numlist=[];
//     function localtoarray(){
//         username=$.cookie('username');
//         if (localStorage.getItem(username+'goodsid') && localStorage.getItem(username+'goodsnum')) {
//             idlist =localStorage.getItem(username+'goodsid').split(','); 
//             numlist = localStorage.getItem(username+'goodsnum').split(','); 
//         } else {
//             idlist = [];
//             numlist = [];
//         }
//     }
// $addcar.on('click',function(){
//         let sid=location.search.substring(1).split('=')[1];
//         let index=$.inArray(sid, idlist);
//         localtoarray();
//         if ($.inArray(sid, idlist) !== -1){
//             let count=parseInt(numlist[index]+1);
//             numlist[index] = count;
//             localStorage.setItem(username+'goodsnum',numlist);
//         } else{
//             idlist.push(sid);
//             localStorage.setItem(username+'goodsid',idlist);
//             numlist.push('1');
//             localStorage.setItem(username+"goodsnum",numlist);
//         }

//         $('.mycart .count').html(localStorage.getItem(username+'goodsid').split(',').length);
//         alert('加入成功');
       
//     })
// }(jQuery)



