/* 数据请求 */

var express = require('express');
var router = express.Router();
const banner = require("../modules/banner");
const good = require("../modules/good");

/* GET home page. */
router.get('/', function(req, res, next) {
    banner((banners)=>{
        good((goods)=>{
            res.render('index', {banners,goods});
        })
    })
});

//<------ 列表 ------>
//渲染页面
router.get('/list', function(req, res, next) {
  res.render('list');
});
//接收接口信息，连接数据库
router.get("/list/goods",function(req,res,next){
    let params = req.query;
    // console.log(params,12345);
    good((goods)=>{
        res.send(goods);
    },params)
})




//<--------- 商品详情----------->
router.get("/detail",function(req,res,next){
    let params = req.query;
    good((goods)=>{
        res.render("detail",{goods})
    },params)

})

module.exports = router;
