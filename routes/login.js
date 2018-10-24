/**
 * Created by web on 2018/9/10.
 */
const express=require("express");
const pool=require("../pool.js");
var router=express.Router();

router.get("/login",(req,res)=>{
    var $phone=req.query.phone;
    var $pwd=req.query.pwd;
    var sql="select * from wy_user where phone=? and pwd=?";
    pool.query(sql,[$phone,$pwd],(err,result)=>{
        if (err)
        {
            throw err;
        }
        if (result.length>0)
        {
            res.send(result);
            return;
        }else
            res.send("用户名或密码错误");
    });
});
router.post("/reg",(req,res)=>{
    var obj=req.body;
    //对客户端所传递的数据进行验证
    var $phone = obj.phone;
    var $upwd = obj.upwd;

    //把数据插入到数据库中
    var sql = 'INSERT INTO wy_user VALUES(NULL,?,?)';
    pool.query(sql,[$phone,$upwd],(err,result)=>{
        if(err) throw err;
        //提示注册成功
        res.send({code: 200, msg: 'register suc'});
    });
});

module.exports=router;
