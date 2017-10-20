/*
* @Author: CL
* @Date:   2017-10-18 21:36:47
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 12:00:18
*/

// 'use strict';

module.exports = (cb,params)=>{
    if(!params.username){
        cb("nologin");
        return ;
    }
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var collection = db.collection('cars');
        collection.find({username:params.username}).toArray(function(err, docs) {
            if(docs.length){
                // console.log(docs[0].goods);
                var cargoods = docs[0].goods;
                var goodscoll = db.collection("goods");
                goodscoll.find({}).toArray(function(err,results){
                    var res = [];
                    for(var i = 0;i < cargoods.length;i ++){
                        for(var j = 0;j < results.length;j ++){
                            if(results[j].goodid == cargoods[i].goodid){
                                results[j].goodnum = cargoods[i].num
                                res.push(results[j]);
                                break;
                            }
                        }
                    }
                    // console.log(res);
                    cb(res);
                    db.close();
                })
            }else{
                cb("empty");
                db.close();
            }
        });

    })
}