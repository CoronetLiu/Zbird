/*
* @Author: CL
* @Date:   2017-10-17 15:44:02
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 21:20:16
*/

// 'use strict';

module.exports = (cb,params)=>{
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017/test";
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var collection = db.collection("goods");
        var start = 0;
        var end = 4;
        if(params){
            start = (params.pageNum - 1) * params.pageSize;
            end = parseFloat(params.pageSize);
            if(!params.goodid){
                // console.log("列表页请求goods");
                collection.find({}).skip(start).limit(end).toArray(function(err,docs){
                    cb(docs);
                });
                db.close();
            }else{
                // console.log("详情页请求goods");
                collection.find({goodid:parseInt(params.goodid)}).toArray(function(err,docs){
                    cb(docs[0]);
                });
                db.close();
            }
        }else{
            // console.log("首页请求goods");
            collection.find({}).skip(start).limit(end).toArray(function(err,docs){
                cb(docs);
            });
            db.close();
        }


    })
}

// db.goods.insertMany([
//     {goodid:1,goodimg:"https://img10.360buyimg.com/n7/jfs/t5719/78/8197698037/49615/c4840903/597815c4Ne5eb0478.jpg",goodname:"施华洛世奇",goodprice:"890.00",description:"SWAROVSKI 施华洛世奇 Iconic Swan黑女款黑天鹅戒指 5366585"},
//     {goodid:2,goodimg:"https://img10.360buyimg.com/n7/jfs/t6688/326/979483303/164745/48a6a41c/5948e52eNa5107f2d.jpg",goodname:"Darry Ring",goodprice:"4199.00",description:"Darry Ring戴瑞珠宝DR求婚钻戒结婚订婚钻石戒指"},
//     {goodid:3,goodimg:"https://img13.360buyimg.com/n7/jfs/t5017/286/2379154851/293021/864216a9/58fd9661Nd881837b.jpg",goodname:"S925",goodprice:"118.00",description:"纯银简约情侣戒指一对微镶锆石开口对戒"},
//     {goodid:4,goodimg:"https://img10.360buyimg.com/n7/jfs/t5071/34/1415442820/179669/44f0b69d/58f07ac8N9864114b.jpg",goodname:"永相随",goodprice:"128.00",description:"经典六爪 s925银戒指女 开口调节款婚戒 银色"},
//     {goodid:5,goodimg:"https://img11.360buyimg.com/n7/jfs/t5674/70/2858660026/194433/e689fc89/5934bde9N22eb1a68.jpg",goodname:"佐卡伊",goodprice:"1999.00",description:"佐卡伊 触电 钻戒结婚求婚戒指群镶钻石女戒"},
//     {goodid:6,goodimg:"https://img13.360buyimg.com/n7/jfs/t8005/191/1854698878/319058/adece926/59c08e85N6b2ef4c6.jpg",goodname:"恋姿",goodprice:"138.00",description:"情侣戒指女韩版学生对戒 纯银 情人节礼物送女友"},
//     {goodid:7,goodimg:"https://img12.360buyimg.com/n7/jfs/t9280/121/410245200/255681/a2e05b28/59a7c94dN57df7e37.jpg",goodname:"摩乐",goodprice:"38.00",description:"龙纹戒指男潮 食指环钛钢霸气复古情侣对戒"},
//     {goodid:8,goodimg:"https://img11.360buyimg.com/n7/jfs/t7780/236/2561471317/110454/17afc8a4/59b100f8Neea96b34.jpg",goodname:"TESiRO",goodprice:"10200.00",description:"通灵珠宝克拉恋人 倾城之恋四爪定制戒指 18K金"},
//     {goodid:9,goodimg:"https://img12.360buyimg.com/n7/jfs/t6256/330/1733554934/190267/ea21b49c/59565cdeN698263e5.jpg",goodname:"曼蒂娅",goodprice:"89.00",description:"曼蒂娅 银戒指 女士款活口仿钻 925银戒指韩版学生 时尚送女朋友礼物"},
//     {goodid:10,goodimg:"https://img12.360buyimg.com/n7/jfs/t8425/158/1772119924/227022/72f22058/59bf2f5dN01bd81dc.jpg",goodname:"卡蒂罗",goodprice:"158.00",description:"卡蒂罗 KADER 共度爱河S925银情侣戒指对戒一对价"}])