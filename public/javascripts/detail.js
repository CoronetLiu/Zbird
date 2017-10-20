/*
* @Author: Cl
* @Date:   2017-10-18 17:03:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 20:33:02
*/

// 'use strict';

$(function(){

    // click 事件
    $(".add-num").on("click",function(){
        var num = parseInt($("#num-inp").val());
        num += 1;
        $("#num-inp").val(num);
    })
    $(".red-num").on("click",function(){
        var num = parseInt($("#num-inp").val());
        num += -1;
        if(num <= 0){
            num = 1;
        }
        $("#num-inp").val(num);
    })




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
        let num = $("#num-inp").val();

        $.ajax({
            url:"/cars/add.do",
            data:{
                username:username,
                goodid:goodid,
                num:num
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