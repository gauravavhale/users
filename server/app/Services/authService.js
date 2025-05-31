var authDAO=require('../Dao/authDAO')
var jwt=require('jsonwebtoken')
async function loginService(data){
   var result= await authDAO.loginDAO(data);
   if(result){
    var token=jwt.sign(data,'secretKey')
    result={uid:result.uid, id:result._id,token};
   }
   return result
}

module.exports={
    loginService
}