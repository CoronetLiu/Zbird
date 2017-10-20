/*
* @Author: CL
* @Date:   2017-10-12 20:14:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-12 21:40:48
*/

// 'use strict'
$(function(){

    console.log($("#username").val(),$("#password").val())
    $("#login-form").submit(function(e){
        if(e.preventDefault){
            e.preventDefault()
        }else{
            e.returnValue = false;
        }
        login();
    })

    function login(){

        $.ajax({
            url:"/api/login",
            type:"GET",
            data:{
                username:$("#username").val(),
                password:$("#password").val()
            }
        }).then(function(res){
            console.log(res);
            switch(res){
                case 1:alert("密码错误！"); break;
                case 2:alert("用户名不存在！");break;
                default:alert("登陆成功！");
                        $.cookie("user_info",res,{
                                path:"/",
                                expires:1
                            })
                        window.location.href = "/";
                        break;
            }
        },function(){
            alert("服务器故障！");
        })

    }


})
