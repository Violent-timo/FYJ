"use strict";!function(n){n("#head").load("./connhead.html",function(){n(".back-home").css({display:"none"})}),n("#wrap").load("./conn.html",function(){n(".all-list").css({display:"block","background-color":"#6E6568","box-shadow":"none"}),n(".all-list .name a").css({color:"#fff"}),n(".all-list .name span").css({color:"#fff"})}),n("#toolbar").load("./toolbar.html",function(){n.cookie("username")&&n(".info .name").html(n.cookie("username"))})}(jQuery),function(){var n=jQuery(".firlive .live-special img");function t(){n.animate({width:"160",height:"160",left:"-70"},1800,"linear").animate({top:"-100"},2e3,"linear").animate({left:"0"},1800,"linear").animate({top:"0"},2e3,"linear").animate({width:"90",height:"59"},1800,"linear")}t(),setInterval(function(){t()},11e3)}(),function(n){var t=n(".left .prev"),e=n(".left .next"),a=n(".left ul li"),l=n(".left  ol li"),i=n(".left "),s=null,c=0;function o(){s=setInterval(function(){c++,r()},3e3)}function r(){c>a.length-1&&(c=0),c<0&&(c=a.length-1),a.eq(c).css({opacity:1,transition:"0.5s"}).siblings().css({opacity:0,transition:"0.5s"}),l.eq(c).addClass("focus").siblings().removeClass("focus")}o(),i.hover(function(){clearInterval(s)},function(){o()}),e.on("click",function(){c++,r()}),t.on("click",function(){c--,r()}),l.on("click",function(){c=n(this).index(),n(this).addClass("focus").siblings().removeClass("focus"),r()})}(jQuery),function(l){var i=l("#seckill ul");l.get("../php/indexskill.php",function(n){var t=JSON.parse(n);i.css({width:200*t.length});for(var e="",a=0;a<t.length;a++)e+='<li><div class="goods">\n            <a href="javascript:;">\n                <img src="'+t[a].url+'" >\n                <p class="sk-name">'+t[a].productname+'</p>\n                     </a>\n                <span class="sk-shadow"></span>\n                </div>\n                <p class="price">\n                    <span class="newprice">￥'+t[a].newprice+'</span>\n                    <span class="oldprice">￥'+t[a].oldprice+"</span>\n                </p></li>";i.html(e)});var n=l(".kill-content .prev"),t=l(".kill-content .next"),s=!0;function e(n){var t=parseInt(i.css("left")),e=l(".list-wrap").width(),a=i.width()-Math.abs(t)-e+20;switch(console.log(a),n){case"-":0<a?1200<=a?i.animate({left:parseInt(i.css("left"))-1200},function(){console.log(i.css("left")),s=!0}):i.animate({left:parseInt(i.css("left"))-a},function(){s=!0}):s=!0;break;case"+":t<-10?t<=-1210?i.animate({left:parseInt(i.css("left"))+1200},function(){console.log(i.css("left")),s=!0}):i.animate({left:parseInt(i.css("left"))-t-10},function(){s=!0}):s=!0}}n.on("click",function(){s&&(s=!1,e("+"))}),t.on("click",function(){s&&(s=!1,e("-"))});var c=l(".timer .h"),o=l(".timer .m"),r=l(".timer .s");setInterval(function(){var n=+new Date("2020-06-08 13:26:00")-+new Date,t=String(parseInt(n/1e3/60/60)%24).padStart(2,0),e=String(parseInt(n/1e3/60)%60).padStart(2,0),a=String(parseInt(n/1e3)%60).padStart(2,0);n<0?(c.html("00"),r.html("00"),o.html("00")):(c.html(t),r.html(a),o.html(e))},1e3)}(jQuery),function(r){var f=r(".relateditem ul");r.get("../php/indexrelated.php ",function(n){var t=JSON.parse(n),e="",a=!0,l=!1,i=void 0;try{for(var s,c=t[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var o=s.value;e+='<li>\n            <a href="javascript:;">\n                <div class="imgwrap">\n                    <img data-original="'+o.url+'" class="lazy">\n                </div>\n                \n                <div class="item-info">\n                    <p class="info-name">'+o.title+'\n                    </p>\n                    <p class="info-price">\n                    <span>￥</span><span class="price">'+o.price+"</span> \n                    </p>\n                </div>\n            </a>\n            </li>\n            "}}catch(n){l=!0,i=n}finally{try{!a&&c.return&&c.return()}finally{if(l)throw i}}f.html(e),r(".lazy").lazyload({effect:"fadeIn"})})}(jQuery);