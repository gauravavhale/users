var stdDAO=require('../Dao/stdDAO')
async function regStdService(data){
 var res=  await stdDAO.regStdDAO(data);
   return res;
}

async function getStdService(){
    var result=await stdDAO.getStdDAO()
    result=result.map((obj)=>{
        delete obj.pwd;
        delete obj.confirmPwd
        return obj
    })
    return result;
}

async function getStdByIdService(id){
    var result=await stdDAO.getStdByIdDAO(id)
    return result;
}

async function deleteStdService(id){
   var result= await stdDAO.delStdDAO(id)
   return result;
}

async function updateStdService(id,data){
  var result= await stdDAO.updateStdDAO(id,data)
  return result;
}

module.exports={
    regStdService,
    getStdService,
    getStdByIdService,
    deleteStdService,
    updateStdService
}