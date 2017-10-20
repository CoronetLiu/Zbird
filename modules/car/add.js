/*
* @Author: CL
* @Date:   2017-10-18 10:23:22
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 19:54:05
*/

// 'use strict';

//添加商品

const add = (params,cb)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var collection = db.collection("cars");
        collection.find({username:params.username}).toArray(function(err,docs){
            if(!params.num){
                //没传 num
                var num = 1;
            }else{
                //传了 num
                var num = parseInt(params.num);
            }
            if(docs.length){
                //有购物车
                // console.log("此用户有购物车");
                let goods = docs[0].goods;
                let ishas = false;
                for(var i = 0;i < goods.length; i ++){
                    if(goods[i].goodid == params.goodid){
                        goods[i].num += num;
                        ishas = true;
                        break;
                    }
                }
                if(!ishas){
                    goods.push({goodid:params.goodid,num:num})
                }
                //更新
                collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
                    if(err){
                        cb("1");
                    }else{
                        cb("0");
                    }
                    db.close();
                })
            }else{
                //没有购物车
                // console.log("此用户没有购物车");
                collection.insertMany([{
                    username:params.username,
                    goods:[{
                        goodid:params.goodid,
                        num:num
                    }]
                }],function(err,results){
                    if(results.insertedCount == 1){
                        cb("0");
                    }else{
                        cb("1")
                    }
                    db.close();
                })
            }
        })
    })
}

module.exports = add;