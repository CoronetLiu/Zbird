/*
* @Author: CL
* @Date:   2017-10-19 17:18:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 17:38:58
*/

// 'use strict';

//------------ 删除商品 ------------//
const delet = (params,cb)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var result = "0";
        var collection = db.collection("cars");
        collection.find({username:params.username}).toArray(function(err,docs){
            if(err) throw err;
            let goods = docs[0].goods;
            for(var i = 0;i < goods.length; i ++){
                if(goods[i].goodid == params.goodid){
                    goods.splice(i,1);
                    break;
                }
            }
            //更新
            collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
                if(err){
                    result = "1";
                }
                cb(result);
                db.close();
            })
        })
    })
}

module.exports = delet;