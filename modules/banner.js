/*
* @Author: CL
* @Date:   2017-10-17 12:06:17
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-17 12:33:52
*/

// 'use strict';

module.exports = (cb)=>{
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017/test";
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var collection = db.collection("banners");
        collection.find({}).toArray(function(err,docs){
            cb(docs);
        });
        db.close();
    })
}

// db.banners.insertMany([{img:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3954621767,2490461867&fm=11&gp=0.jpg",title:"第一张"},{img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=694411465,2165484918&fm=11&gp=0.jpg",title:"第二张"},{img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4067867750,3236417217&fm=27&gp=0.jpg",title:"第三张"},{img:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4285593758,2463183518&fm=27&gp=0.jpg",title:"第四张"},{img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=792664294,462580561&fm=11&gp=0.jpg",title:"第五张"}])