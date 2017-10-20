/*
* @Author: CL
* @Date:   2017-10-16 20:13:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 16:06:31
*/

// 'use strict';

//register 操作数据库
module.exports = (params,suc,fai)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        var collection = db.collection('user');
        collection.find({username:params.username}).toArray(function(err,docs){
            if(docs.length || !params.username){
                fai()
                db.close();
            }else{
                collection.insertMany([params],function(err,result){
                    // console.log("result.insertedCount=" + result.insertedCount);
                    if(result.insertedCount == 1){ //?????
                        suc()
                    }else{
                        fai()
                    }
                    db.close();
                });
            }
        });

    });
}