/**
 * Created by web on 2018/9/15.
 */
$(function(){
    function unScroll() {
        var top = $(document).scrollTop();
        $(document).on('scroll.unable',function (e) {
            $(document).scrollTop(top);
        })
    };

    //移动
    var canMove=false,offsetX,offsetY;
    $("body").on("mousedown","#login>.lo-head",function(e){
        canMove=true;
        offsetX= e.offsetX,offsetY= e.offsetY;
    });
    $(window).mousemove(function (e) {
        if(canMove){
            var top= e.clientY-offsetY;
            var left= e.clientX-offsetX;
            login.style.top=`${top}px`;
            login.style.left=`${left}px`;
        }
    });
    $("body").on("mouseup","#login",function(){
        canMove=false;
    });
    //显示列表
    $("[data-trigger=dropdown]").parent().mouseover(function(){$(".m-tlist").show()}).mouseout(function(){$(".m-tlist").hide()});
//登录
    $("body").on("click","[data-trigger=dropdown]",function() {
        unScroll();
        $.ajax({
            url: "locon.html",
            type: "get",
            success: function (res) {
                $(res).appendTo("body");
            }
        })
    });
    $("body").on("click","[data-trigger=phonl]",function() {
        $("#login").remove();
        $(".m-mask").remove();
        $.ajax({
            url: "login.html",
            type: "get",
            success: function (res) {
                $(res).appendTo("body");
            }
        })
    });
    $("body").on("click","[data-trigger=phonr]",function() {
        $("#login").remove();
        $(".m-mask").remove();
        $.ajax({
            url: "reg.html",
            type: "get",
            success: function (res) {
                $(res).appendTo("body");
            }
        })
    });
    $("body").on("click","[data-action=log-reg ]",function() {
        $("#login").remove();
        $(".m-mask").remove();
        $.ajax({
            url: "reg.html",
            type: "get",
            success: function (res) {
                $(res).appendTo("body");
            }
        })
    });
    $("body").on("click","[data-action=log-back]",function() {
        $("#login").remove();
        $(".m-mask").remove();
        $.ajax({
            url: "locon.html",
            type: "get",
            success: function (res) {
                $(res).appendTo("body");
            }
        })
    });
    $("body").on("click","[data-action=denlou]",function() {
        $("#login").remove();
        $(".m-mask").remove();
        $.ajax({
            url: "login.html",
            type: "get",
            success: function (res) {
                $(res).appendTo("body");
            }
        })
    });

    //关闭
    $("body").on("click","#login>.lo-x",function(){
        $("#login").remove();
        $(".m-mask").remove();
        $(document).unbind("scroll.unable");
    });
    //登录手机
    $("body").on("click","[data-action=login]",function(){
        $(".m-tlist").hide();
        unScroll();
        $.ajax({
            url:"login.html",
            type:"get",
            success:function(res){
                $(res).appendTo("body");
            }
        }).then(function(res){
            return (function(){
                $("[data-check=check]").click(function(){
                    //
                    phone=$("[data-check=req-phone]").html();
                    console.log(phone);
                    pwd=$("[data-check=req-pwd]").html();
                    console.log(pwd);
                    $.ajax({
                        url:"http://localhost:3000/user/login",
                        type:"get",
                        data:{phone,pwd},
                        dataType:"json",
                        success:function(res){

                            var html=res;
                            console.log(html);

                            $("#plist").html(html);

                            var $res=$("[data-check=res]")
                            $res.html(html);

                        }
                    })
                    //
                });

                $("[data-action=log-back]").click(function(){

                });
            })();

        } );
    });
});
//轮播
//点击-->切换图片（改变left） 自动轮播 -->（left）
//点解btn按钮和小圆点切换图片
//nowIndex --->prevBtn (nowindex--) --> nextBtn (nowindex ++)
//li --> $(this).index()
//自动播放 --> 隔一段时间点击nextBtn

var nowIndex = 0,
    len =8,
    key = true,
    timer = null,
    itemWidth = 730;
init();
//封装
function init(){
    bindEvent();
    sliderAuto();
}
//点击事件
function bindEvent(){
    $('.bn-l')
        .add($('.bn-r'))
        .add($('.bn-di li'))
        .on('click',function(){
            if($(this).attr('class') == 'bn-l'){
                move('prev')
            }else if($(this).attr('class') == 'bn-r'){
                move('next')
            }else{
                move($(this).index());
            }
        })
    //悬浮事件
    $('.banner-img').on('mouseenter',function(){
        clearTimeout(timer);
    }).on('mouseleave',function(){
        sliderAuto();
    });
}
//图片位移
function move(dir){
    if(key){
        key = false;
        if(dir == 'prev' || dir == 'next'){
            if(dir == 'prev'){
                if(nowIndex == 0){
                    $('.banner-ii').css('left',-(len * itemWidth));
                    nowIndex = len - 1;
                }else{
                    nowIndex --;
                }
            }else{
                if(nowIndex == 7){
                    $('.banner-ii').animate({
                        'left' : -(len * itemWidth)
                    },function(){
                        $('.banner-ii').css('left','0');
                    });
                    nowIndex = 0;
                }else{
                    nowIndex ++;
                }
            }
        }else{
            nowIndex = dir;
        }

        slider();
        changeStyle();
    }

}
//
var color=["#D3D455","#05025D","#A89C8C","#130B09","#010101","#040203","#525DAA","#141F21","#D3D455"];
function slider(){
    $('.banner-ii').animate({
        'left' : -(nowIndex * itemWidth)
    },function(){
        sliderAuto();
        key = true;
    });
    $('.banner').css(
        'background',color[nowIndex])
}
//小圆点
function changeStyle(){
    $('.active').removeClass('active');
    $('.bn-di li').eq(nowIndex).addClass('active');
}
//定时器
function sliderAuto(){
    clearInterval(timer);
    timer = setInterval(function(){
        move('next')
    },1500);
    // clearTimeout(timer);
    // timer = setTimeout(function(){
    //     move('next');
    // },1000);
}


