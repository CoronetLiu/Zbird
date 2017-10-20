/* 资源请求 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//<------ 登录 ------>

//渲染页面
router.get('/login', function(req, res, next) {
  res.render('login');
});
//接收接口信息，连接数据库
const login = require("../modules/login");
router.get("/logininfo",function(req,res,next){
    let params = req.query;
    login(params,(info)=>{
        res.send({
            nickname:info.nickname,
            username:info.username
        })
    },(sta)=>{
        res.send(sta);
    });
})


//<------ 注册 ------>
//渲染页面
router.get('/register', function(req, res, next) {
  res.render('register');
});
//接收接口信息，连接数据库
const register = require("../modules/register");
router.post("/registerinfo",function(req,res,next){
    let params = req.body;
    register(params,()=>{
        res.send("0")
    },()=>{
        if(params.username){
            res.send("1")
        }else{
            res.send("2");
        }
    });
})


module.exports = router;
