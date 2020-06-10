///tab切换
!function(){
    const toolbar=document.querySelector(".toolbar");
    const btnlist=toolbar.querySelectorAll('ul li');
    const btnlist_tlt=toolbar.querySelectorAll('ul li em');
    const showlist=toolbar.querySelectorAll('ol li');
    const closeshow=toolbar.querySelectorAll('.close');
    let block=true;

    for(let i=0;i<btnlist.length;i++){
        btnlist[i].onclick=function(){
        //点击任意一个按钮显示详细信息
            if(($.cookie('username'))){
                toolbar.setAttribute('active','true');
                for(let j=0;j<btnlist.length;j++){
                    btnlist[j].setAttribute('active','false');
                    showlist[j].setAttribute('active','false');
                    btnlist_tlt[j].style.display='block';
                }
                
                this.setAttribute('active','true');
                showlist[i].setAttribute('active','true');
                btnlist_tlt[i].style.display='none';
            }else{
                alert('请先登入用户');
            }
        }
    
        
        closeshow[i].onclick=function(){
            toolbar.setAttribute('active','false');
            btnlist[i].setAttribute('active','false');
        }
    }
    
    

}()


//回到顶部
!function(){
    $('.totop').on('click',function(){
      
        let scrollTop=$(document).scrollTop();
        let timer=setInterval(function(){
            $(document).scrollTop(scrollTop-=50);
            if(scrollTop<=0){
                clearInterval(timer);
            }
        },1000/60)
    })
}()

//cookie相关
!function(){
    $('.exit').on('click',function(){
        $.removeCookie('username',{path:'/'});
        location.href='login.html';
    })

    if($.cookie('username')){
        $('.unuse').css({display:'none'});
        $('.use').css({display:'block'});
        $('.use span').html($.cookie('username'));  
    }
}()