/*
* @Author: CL
* @Date:   2017-10-17 17:51:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 20:33:15
*/

// 'use strict';

$(function(){

    var pageNum = 0;
    var pageSize = 4;

    function listGoods(type){
        this.type = type;
        this.init();
    }
    listGoods.prototype.init = function(){
        this.getGoods();
    }
    listGoods.prototype.getGoods = function(){
        var that = this;
        pageNum += this.type ? 1 : -1;
        // console.log(pageNum);
        $.ajax({
            url:"/list/goods",
            data:{
                pageNum:pageNum,
                pageSize:pageSize
            }
        }).then(function(res){
            if(!res.length){
                alert(that.type ? "已经是最后一页了！" : "已经是第一页了！");
                pageNum += that.type ? -1 : 1;
            }else{
                that.render(res);
            }
        },function(){
            alert("服务器故障！");
        })
    }
    listGoods.prototype.render = function(goods){
        // console.log(goods);
        var str = "";
        goods.forEach(function(goods,i){
            str += `<div class="col-xs-12 col-md-6 col-lg-3">
                        <div class="thumbnail">
                        <a href="/detail?goodid=${goods.goodid}"><img class="good-img" title="${goods.description}" src="${goods.goodimg}" alt="${goods.goodname}"></a>
                            <div class="caption">
                                <h3>${goods.goodname}</h3>
                                <p>${goods.description}</p>
                                <p class="clearfix">
                                    <button class="btn btn-danger pull-left" role="button">￥：${goods.goodprice}</button>
                                    <button data-id="${goods.goodid}" class="btn btn-primary pull-right buy-btn" role="button">加入购物车</button>
                                </p>
                            </div>
                        </div>
                    </div>`
        })
        $(".goods-row").html(str);
        $(".page").html(pageNum);
    }

    new listGoods(true);

    $(".prev").on("click",function(){
        new listGoods(false)
    })
    $(".next").on("click",function(){
        new listGoods(true)
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