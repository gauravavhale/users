var express=require('express');
var router=express.Router();
// client 1. query params  - name, loc 
// a. as part of request url b. start with ? c.key,value d. any(but not recomended) e. using &  

router.get("/get-player",function(req,res,next){// receive the req
    
    // take the data from req
    var n=req.query.name
    var l=req.query.loc
    // conn with DB
    // perform required DB operation
    // prepare the res
    // send the res to client
    res.send(`This is ${n}, i am from ${l}...`);
})
// client 1. path params  - name, loc 
// a. as part of request url b. start with / c.value d. any(but not recomended) e. using / 

router.get("/get-player-path/:name/:loc",function(req,res,next){// receive the req
    
    // take the data from req
    var n=req.params.name
    var l=req.params.loc
    // conn with DB
    // perform required DB operation
    // prepare the res
    // send the res to client
    res.send(`This is ${n}, i am from ${l}...`);
})

// client 1. req headers  - name, loc 
// a. as part of request headers b. object c. key,value d. any(but not recomended) 

router.put("/get-player-headers",function(req,res,next){// receive the req
    
    // take the data from req
    var n=req.headers.name
    var l=req.headers.loc
    // conn with DB
    // perform required DB operation
    // prepare the res
    // send the res to client
    res.send(`This is ${n}, i am from ${l}...`);
})


// client 1. req headers  - name, loc 
// a. as part of request headers b. object c. key,value d. any(but not recomended) 

router.post("/get-player-body",function(req,res,next){// receive the req
    
    // take the data from req
    var n=req.body.name
    var l=req.body.loc
    // conn with DB
    // perform required DB operation
    // prepare the res
    // send the res to client
    res.send(`This is ${n}, i am from ${l}...`);
})



module.exports=router;