"use strict";!function(n){var o=n(".togbtn").children(),i=n("form"),s=n(".error");console.log(s),o.on("click",function(){n(this).children().addClass("active"),i.eq(n(this).index()).css({display:"block"}).siblings("form").css({display:"none"}),n(this).siblings().children().removeClass("active")});var l=n(".loginform .user input"),t=n(".loginform .password input"),r=n(".loginBtn");l.on("blur",function(){n.post("http://10.31.162.14/Zshoppro/php/login.php",{username:n(this).val()},function(o){"1"===o?s.css({display:"none"}):(s.css({display:"block"}),l.val(""))})}),r.on("click",function(){l.val()&&t.val()&&n.post("http://10.31.162.14/Zshoppro/php/login.php",{username:l.val(),password:t.val()},function(o){"1"===o?(n.cookie("username",l.val(),{path:"/"}),alert("登录成功"),location.href="index.html"):(alert("密码输入错误，请重新输入"),t[0].focus(),t.val(""))})})}(jQuery),jQuery(".foot .right a").on("click",function(){location.href="register.html"});