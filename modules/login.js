/*
* @Author: CL
* @Date:   2017-10-16 17:02:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-16 18:16:06
*/

// 'use strict';

// login 操作数据库
module.exports = (params,suc,fai)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var collection = db.collection('user');
        collection.find({username:params.username}).toArray(function(err, docs) {
            var sta = "0";  //成功
            if(docs.length){
                if(docs[0].password == params.password){
                    suc(docs[0])
                }else{
                    sta = "1";  //密码错误
                    fai(sta)
                }
            }else{
                sta = "2"; //用户不存在
                fai(sta)
            }
        });
        db.close();
    })
}