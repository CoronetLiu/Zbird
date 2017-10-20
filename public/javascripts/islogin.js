/*
* @Author: CL
* @Date:   2017-10-17 17:49:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 18:07:41
*/

// 'use strict';

//*********** 判断是否登录 **************//
$(function(){

    function lr(){
        this.init();
    }
    lr.prototype.init = function(){
        this.islogin();
    }
    lr.prototype.islogin = function(){
        var user_info = $.cookie("user_info") ? JSON.parse($.cookie("user_info")) : null;
        if(user_info){
            console.log("已登录");
            $(".user").html(user_info.nickname);
            $(".lr").addClass("hidden");
            $(".islogin").removeClass("hidden");
        }else{
            console.log("未登录");
            $(".user").html();
            $(".lr").removeClass("hidden");
            $(".islogin").addClass("hidden");
        }
    }

    new lr();


    $(".aexit").on("click",function(){
        $.cookie("user_info",null,{
            path:"/",
            expires:-1
        });
        new lr();
        return false;
    })

})//$
