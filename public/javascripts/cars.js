/*
* @Author: CL
* @Date:   2017-10-18 20:50:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 22:55:50
*/

// 'use strict';

$(function(){
    function render(){
        var all_money = 0;
        var all_num = 0;
        $(".good-money").each(function(i){
            all_money += parseFloat($(this).html());
        })
        $(".good-num").each(function(i){
            all_num += parseFloat($(this).html());
        })
        $(".all-num").html(all_num);
        $(".all-money").html(all_money);
        if(!$.cookie("user_info")){
            alert("请登录后操作！");
            $(".good-row").html('<p class="alert text-center">请登录后操作！</p>')
        }else{
            if(all_money == 0 || all_num == 0){
                $(".good-row").html('<img class="center-block" src="/images/nogoods.jpg" alt="没有商品">')
            }
        }

    }
    render();

    //******** ajax *********//
    function ajax(url,obj,cb,ab){
        var that = obj;
        var goodid = $(obj).data("id");
        if(!$.cookie("user_info")){
            alert("请登录后操作！");
            return ;
        }
        var username = JSON.parse($.cookie("user_info")).username;
        $.ajax({
            url:url,
            data:{
                username:username,
                goodid:goodid
            },
            type:"POST"
        }).then(function(res){
            if(res == "0"){
                // console.log("操作成功");
                cb();
            }else if(res == "1"){
                ab();
            }else{
                alert("操作失败！")
            }
        },function(){
            alert("服务器故障！")
        })
    }
    //------------ add --------------//

    $(".good-row").delegate('.add-btn', 'click', function() {
        ajax("/cars/add.do",this,()=>{
            // console.log(this);
            var price = parseFloat($(this).parents(".good-item").find(".good-price").html());
            var _num = parseFloat($(this).siblings('.good-num').html()) + 1;
            $(this).siblings('.good-num').html(_num);
            $(this).parents(".good-item").find(".good-money").html(price * _num);
            render();
        })
    });

    //----------- reduce -------------//

    $(".good-row").delegate('.red-btn', 'click', function() {
        ajax("/cars/reduce.do",this,()=>{
            var price = parseFloat($(this).parents(".good-item").find(".good-price").html());
            var _num = parseFloat($(this).siblings('.good-num').html()) - 1;
            $(this).siblings('.good-num').html(_num);
            $(this).parents(".good-item").find(".good-money").html(price * _num);
            render();
        },()=>{
            $(this).parents(".good-item").remove();
            render();
        })
    });

    //----------- delet -------------//

    $(".good-row").delegate('.delet-btn', 'click', function() {
        ajax("/cars/delet.do",this,()=>{
            $(this).parents(".good-item").remove();
            render();
        })
    });

    //----------- clear -------------//

    $(".good-row").delegate('.clear-btn', 'click', function() {
        ajax("/cars/clear.do",this,()=>{
            $(this).siblings('li').remove();
            render();
        })
    });

    //------------- remove -----------//

    $(".good-row").delegate('.remove-btn', 'click', function() {
        var that = this;
        var arr = [];
        var arr_checked = [];
        $(".checkbox").each(function(i){
            // console.log($(this))
            if($(this).is(":checked")){
                // console.log(this);
                var obj = {goodid:$(this).data("id")};
                arr.push(obj);
                arr_checked.push(this);
            }
        });
        var goodid = JSON.stringify(arr);
        if(!$.cookie("user_info")){
            alert("请登录后操作！");
            return ;
        }
        var username = JSON.parse($.cookie("user_info")).username;
        $.ajax({
            url:"/cars/remove.do",
            data:{
                username:username,
                goods:goodid
            },
            type:"POST"
        }).then(function(res){
            // console.log(res);
            if(res == "0"){
                // console.log("操作成功");
                for(var i = 0;i < arr_checked.length;i ++){
                    $(arr_checked[i]).parents(".good-item").remove();
                }
                render();
            }else{
                alert("操作失败！")
            }
        },function(){
            alert("服务器故障！")
        })
    });


})//$