/*
* @Author: CL
* @Date:   2017-10-19 16:21:06
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 20:01:07
*/

// 'use strict';

// ----------- 数量减一 ----------//
const reduce = (params,cb)=>{
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
                    goods[i].num --;
                    if(goods[i].num <= 0){
                        goods.splice(i,1);
                        result = "1"
                    }
                    break;
                }
            }
            //更新
            collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
                if(err){
                    result = "2";
                }
                cb(result);
                db.close();
            })
        })
    })
}

module.exports = reduce;