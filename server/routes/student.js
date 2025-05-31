var express=require('express');
var router=express.Router()

router.get('/get-std',function(req,res,next){
    res.send("Hello World")
})

//http://localhost:2020/std/get-std , get


module.exports=router;