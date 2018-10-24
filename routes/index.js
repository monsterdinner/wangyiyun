const express=require("express");
const router=express.Router();
const pool=require("../pool");

//index/
router.get("/",(req,res)=>{
  var sql=`SELECT * FROM yun_user
  where lid!=0
  order by lid`;
  pool.query(sql,[],(err,result)=>{
    if(err)
      console.log(err);
    res.send(result);
  })
})

module.exports=router;