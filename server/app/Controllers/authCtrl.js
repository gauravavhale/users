var express=require('express')
var router=express.Router()
var authService=require('../Services/authService')

router.post('/login',async function(req,res,next){
    try{
        var data=req.body.data;
        var result=await authService.loginService(data);
        res.send(result)
    }catch(e){
        console.log("login",e);
        res.send(e.message)
    }
     
})

module.exports=router;