/*
* @Author: CL
* @Date:   2017-10-18 10:14:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 22:31:57
*/

// 'use strict';

/* cars 操作 */

var express = require('express');
var router = express.Router();
var carutil = require("../modules/car");


//<------ 购物车 ------>
router.get('/', function(req, res, next) {
    let params = req.cookies.user_info ? JSON.parse(req.cookies.user_info) : 123;
    // console.log(params);
    carutil.showcar((goods)=>{
        res.render('cars',{goods});
    },params)
});

router.post("/add.do",function(req,res,next){
    let params = req.body;
    // console.log(params);
    carutil.add(params,(results)=>{
        res.send(results);
    })
})

router.post("/reduce.do",function(req,res,next){
    let params = req.body;
    carutil.reduce(params,(results)=>{
        res.send(results);
    })
})

router.post("/delet.do",function(req,res,next){
    let params = req.body;
    carutil.delet(params,(results)=>{
        res.send(results);
    })
})

router.post("/clear.do",function(req,res,next){
    let params = req.body;
    carutil.clear(params,(results)=>{
        res.send(results);
    })
})

router.post("/remove.do",function(req,res,next){
    let params = req.body;
    console.log(params.goods,12345);
    carutil.remove(params,(results)=>{
        res.send(results);
    })
})

module.exports = router;