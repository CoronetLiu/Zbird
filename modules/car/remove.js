/*
* @Author: CL
* @Date:   2017-10-19 20:35:26
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 22:36:34
*/

// 'use strict';

// params 是个对象
// params.goods => 是个字符串  >>>>>>需要转化成对象

//--------- remove ------------//
const remove = (params,cb)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var result = "0";
        var collection = db.collection("cars");
        collection.find({username:params.username}).toArray(function(err,docs){
            // console.log(docs[0]);
            var goods = docs[0].goods;
            var par = JSON.parse(params.goods);
            // console.log(par,111111)
            // console.log(goods[0].goodid,222222)
            // console.log(par[0].goodid,333333)
            for(var i = 0;i < goods.length;i ++){
                for(var j = 0;j < par.length;j ++){
                    if(goods[i].goodid == par[j].goodid){
                        goods.splice(i,1);
                        break;
                    }
                }
            }
            // //更新
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

module.exports = remove;