/*
* @Author: CL
* @Date:   2017-10-12 19:27:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 20:33:09
*/

// 'use strict';

$(function(){

    //************** 轮播图 *************//
    function Banner(btn,pic){
        this.prev = btn.left;
        this.next = btn.right;
        this.pic = pic;
        this.index = 0;
        this.init();
        this.autoplay();
    }
    Banner.prototype.init = function(){
        var that = this;
        this.prev.onclick = function(){
            that.changeIndex("left");
        }
        this.next.onclick = function(){
            that.changeIndex("right");
        }
    }
    Banner.prototype.autoplay = function(){
        var that = this;
        var timer = null;
        timer = setInterval(function(){
            that.changeIndex("right");
        },1000)
        this.pic.onmouseover = this.prev.onmouseover = this.next.onmouseover = function(){
            that.prev.style.display = "block";
            that.next.style.display = "block";
            clearInterval(timer);
        }
        this.pic.onmouseout = this.prev.onmouseout = this.next.onmouseout = function(){
            that.prev.style.display = "none";
            that.next.style.display = "none";
            timer = setInterval(function(){
                that.changeIndex("right");
            },1000);
        }
    }
    Banner.prototype.changeIndex = function(direction){
        if(direction == "left"){
            if(this.index == 0){
                this.index = this.pic.children.length - 1;
            }else{
                this.index --;
            }
        }
        if(direction == "right"){
            if(this.index == this.pic.children.length - 1){
                this.index = 0;
            }else{
                this.index ++;
            }
        }
        this.move();
    }
    Banner.prototype.move = function(){
        for(var i = 0;i < this.pic.children.length;i ++){
            this.pic.children[i].style.opacity = 0;
            this.pic.children[i].style.zIndex = 0;
        }
        this.pic.children[this.index].style.zIndex = 1;
        this.pic.children[this.index].style.opacity = 1;
    }

    new Banner({
        left:$("#prev")[0],
        right:$("#next")[0]
    },$("#pic")[0]);

    //添加购物车
    $(".goods-row").delegate(".buy-btn","click",function(){
        if(!$.cookie("user_info")){
            alert("请登录后操作！");
            return ;
        }
        let user_info = JSON.parse($.cookie("user_info"));
        let username = user_info.username;
        // let goodid = $(this).attr("data-id");
        let goodid = $(this).data("id");
        $.ajax({
            url:"/cars/add.do",
            data:{
                username:username,
                goodid:goodid
            },
            type:"POST"
        }).then(function(res){
            // console.log("res=" + res);
            if(res == "0"){
                alert("成功加入购物车！");
            }else{
                alert("加入购物车失败！");
            }
        },function(){
            alert("服务器故障！");
        })
    })


})//$
