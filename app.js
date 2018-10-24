const express=require('express');
const bodyParse=require('body-parser');
const index=require("./routes//index");


var app=express();
var server=app.listen(3000);
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static("html"));
app.use("/index",index);