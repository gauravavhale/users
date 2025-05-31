var mongo=require('mongodb')
var ObjectId=mongo.ObjectId

var getDBCon=require('../Common/getDBConn')
async function regStdDAO(data){
   var db=await getDBCon()
   var collection=db.collection("students")
   var result=await collection.insertOne(data)
   return result;
}

async function getStdDAO(){
    var db=await getDBCon()
    var collection=db.collection("students")
    var result=await collection.find({}).toArray()
    return result;
}

async function getStdByIdDAO(id){
    var db=await getDBCon();
    var collection=db.collection("students")
    var result=await collection.findOne({_id:new ObjectId(id)})
    return result;
}

async function delStdDAO(id){
    var db =await getDBCon();
    var collection=db.collection("students")
    var result=await collection.deleteOne({_id:new ObjectId(id)})
    return result;
}

async function updateStdDAO(id,data){
   var db= await getDBCon()
   var collection=db.collection("students")
   var result=await collection.updateOne({_id:new ObjectId(id)},{$set:data})
   return result;
}

module.exports={
    regStdDAO,
    getStdDAO,
    getStdByIdDAO,
    delStdDAO,
    updateStdDAO
}