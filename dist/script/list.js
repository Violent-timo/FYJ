"use strict";$("#head").load("./connhead.html"),$("#wrap").load("./conn.html"),$("#toolbar").load("./toolbar.html",function(){$.cookie("username")&&$(".info .name").html($.cookie("username"))}),function(c){var i,s,e,p,r,l;location.search.substring(1)||(i=function(n){var a=c("<li></li>");a.html('\n                <div class="goods-content">\n                    <div class="goods-pic">\n                        <a href="detail.html?sid='+n.id+"\"><img class='lazy' data-original=\""+n.goods_img+' "></a>\n                    </div>\n                    <div class="goods-info">\n                        <div class="p-price">\n                            <p><span>￥</span><span class=\'now-price\'>'+n.goods_price+'</span><i>限时折扣</i></p>\n                        </div>\n                        <div class="p-name">\n                            <a href="javascript:;">\n                                \n                                <p>'+n.goods_name+'</p>\n                            </a>\n                        </div>\n                        <div class="p-commit">\n                            <strong class="sell">\n                                <a href="javascript:;">'+n.goods_number+'</a>\n                                笔成交\n                            </strong>\n                            <strong class="remark">\n                                <a href="javascript:;">0</a>\n                                评论\n                            </strong>\n                        </div>\n                        <div class="p-shop">\n                            <span>\n                                <a href="javascript:;">'+n.goods_state+'</a>\n                            </span>\n                        </div>\n                        <div class="p-icons">\n                            <i>自营</i>\n                        </div>\n                        <div class="p-operate">\n                            <div class="btn focus">\n                                <a href="javascript:;">收藏\n                                    <i></i>\n        \n                                </a>\n                                <a href="javascript:;" class="active">\n                                    <span></span>\n                                </a>\n                            </div>\n                            <div class="btn addcar">\n                                <a href="javascript:;">加入购物车\n                                    <i></i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            '),l.append(a)},s=[],e=[],r=p=null,l=c(".list-wrap"),c.ajax({url:"http://10.31.162.14/Zshoppro/php/list.php",dataType:"json"}).done(function(n){c.each(n,function(n,a){i(a)}),c(function(){c("img.lazy").lazyload({effect:"fadeIn"})}),s=[],e=[],r=p=null,c(".list-wrap li").each(function(n,a){e[n]=c(this),s[n]=c(this)})}),c(".page").pagination({pageCount:11,jump:!0,coping:!0,prevContent:"上一页",nextContent:"下一页",homePage:"首页",endPage:"尾页",callback:function(n){l.empty(),console.log(n.getCurrent()),c.ajax({url:"../php/list.php",data:{page:n.getCurrent()},dataType:"json"}).done(function(n){c.each(n,function(n,a){i(a),c(".lazy").lazyload({effect:"fadeIn"})}),s=[],e=[],r=p=null,c(".list-wrap li").each(function(n,a){e[n]=c(this),s[n]=c(this)})})}}),c(".array li").on("click",function(){c(this).children().addClass("a-active"),c(this).siblings().children().removeClass("a-active")}),c(".default").on("click",function(){c.each(s,function(n,a){c(".list-wrap ").append(a)}),c("a.price").find("i").css({"background-position":"0 -380px"})}),c("a.price").on("click",function(){if("down"==c(this).attr("price")){for(var n=0;n<e.length-1;n++)for(var a,i=0;i<e.length-n-1;i++){p=parseFloat(e[i].find(".now-price").html()),r=parseFloat(e[i+1].find(".now-price").html()),p<r&&(a=e[i],e[i]=e[i+1],e[i+1]=a)}c.each(e,function(n,a){l.append(a)}),c(this).attr("price","up"),c(this).find("i").css({"background-position":"0 -380px"})}else if("up"==c(this).attr("price")){for(var s=0;s<e.length-1;s++)for(var o,t=0;t<e.length-s-1;t++){console.log(e[t].find(".now-price").html()),p=parseFloat(e[t].find(".now-price").html()),(r=parseFloat(e[t+1].find(".now-price").html()))<p&&(o=e[t],e[t]=e[t+1],e[t+1]=o)}c.each(e,function(n,a){l.append(a)}),c(this).attr("price","down"),c(this).find("i").css({"background-position":"0 -224px"})}}),window.render=i)}(jQuery),function(s){var n=decodeURIComponent(location.search.substring(1).split("=")[1]);s("ul.list-wrap");s.post("../php/indexsearch.php",{keyword:n},function(n){var a=JSON.parse(n),i="";s.each(a,function(n,a){i+='<li>\n            <div class="goods-content">\n                <div class="goods-pic">\n                <a href="detail.html?sid='+a.id+"\"><img class='lazy' data-original=\""+a.goods_img+' "></a>\n                </div>\n                <div class="goods-info">\n                    <div class="p-price">\n                        <p><span>￥</span><span class=\'now-price\'>'+a.goods_price+'</span><i>限时折扣</i></p>\n                    </div>\n                    <div class="p-name">\n                        <a href="javascript:;">\n                            \n                            <p>'+a.goods_name+'</p>\n                        </a>\n                    </div>\n                    <div class="p-commit">\n                        <strong class="sell">\n                            <a href="javascript:;">'+a.goods_number+'</a>\n                            笔成交\n                        </strong>\n                        <strong class="remark">\n                            <a href="javascript:;">0</a>\n                            评论\n                        </strong>\n                    </div>\n                    <div class="p-shop">\n                        <span>\n                            <a href="javascript:;">'+a.goods_state+'</a>\n                        </span>\n                    </div>\n                    <div class="p-icons">\n                        <i>自营</i>\n                    </div>\n                    <div class="p-operate">\n                        <div class="btn focus">\n                            <a href="javascript:;">收藏\n                                <i></i>\n\n                            </a>\n                            <a href="javascript:;" class="active">\n                                <span></span>\n                            </a>\n                        </div>\n                        <div class="btn addcar">\n                            <a href="javascript:;">加入购物车\n                                <i></i>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div></li>\n        '}),s(".list-wrap").append(i),s(".lazy").lazyload({effect:"fadeIn"})})}(jQuery);