var express=require('express');
var router=express.Router();
var stdService=require('../Services/stdService');
var verifyToken=require('../Common/verifyToken');
router.get(
    '/get-std',
    verifyToken,
    async function(req,res,next){
    try{
     var result=await stdService.getStdService()
     res.send(result);
    }catch(e){
        res.status(500).send(e);
    }
   }
);

router.post('/reg-std',async function(req,res,next){
    try{
   var data= req.body.data;
   var result=await stdService.regStdService(data)
   res.send(result);
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
})

router.get('/get-std-by-id', verifyToken,async function(req,res,next){
    try{
    var id=req.query.id;
    var result=await stdService.getStdByIdService(id)
    res.send(result);
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
})

router.put('/std-update',verifyToken,async function(req,res,next){
    try{
    var id=req.query.id;
    var data=req.body.data;
    var result=await stdService.updateStdService(id,data)
    res.send(result);
    }catch(e){
        console.log("std-update/",e)
        res.send(e.message);
    }
   
})

router.delete('/std-del/:id',verifyToken,async function(req,res,next){
    try{
        var id=req.params.id
        var result=await stdService.deleteStdService(id)
        res.send(result);
    }catch(e){
        console.log("std-del/",e)
        res.send(e.message);
    }
})

module.exports=router;