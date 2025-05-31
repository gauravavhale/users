var getDBCon=require('../Common/getDBConn')

async function loginDAO(data){
    var db=await getDBCon();
    var collection=db.collection("students")
    var result=await collection.findOne(data)
    return result;
}

module.exports={
    loginDAO
}