"use strict";!function(l){for(var r=document.querySelector(".toolbar"),c=r.querySelectorAll("ul li"),o=r.querySelectorAll("ul li em"),i=r.querySelectorAll("ol li"),e=r.querySelectorAll(".close"),t=0;t<c.length;t++)!function(t){c[t].onclick=function(){if(l.cookie("username")){r.setAttribute("active","true");for(var e=0;e<c.length;e++)c[e].setAttribute("active","false"),i[e].setAttribute("active","false"),o[e].style.display="block";this.setAttribute("active","true"),i[t].setAttribute("active","true"),o[t].style.display="none"}else alert("请先登入用户")},e[t].onclick=function(){r.setAttribute("active","false"),c[t].setAttribute("active","false")}}(t)}(jQuery),function(l){l(".totop").on("click",function(){var e=l(document).scrollTop(),t=setInterval(function(){l(document).scrollTop(e-=50),e<=0&&clearInterval(t)},1e3/60)})}(jQuery);