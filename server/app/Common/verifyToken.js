var jwt=require('jsonwebtoken')
 function verifyToken(req,res,next){
        var token=req.headers.authorization
        if(token){
            jwt.verify(token,'secretKey',function(e,s){
                if(e){
                    res.send("Invalid Token")
                }else{
                    next()
                }
            })
        }else{
            res.send("Token missing")
        }
}

module.exports=verifyToken