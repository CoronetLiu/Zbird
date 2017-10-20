/*
* @Author: CL
* @Date:   2017-10-19 17:17:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 20:28:22
*/

// 'use strict';

const clear = (params,cb)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var result = "0";
        var collection = db.collection("cars");
        collection.update({username:params.username},{$set:{goods:[]}},(err,results)=>{
            if(err){
                result = "1";
            }
            cb(result);
            db.close();
        })
    })
}


module.exports = clear;