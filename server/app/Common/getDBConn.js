var mongo=require('mongodb')
require('dotenv').config();

async function getDBCon(){
    var url=process.env.MONGODB_URL;
    var mongoClient=mongo.MongoClient;
    var mongoServer=await mongoClient.connect(url)
    var db=mongoServer.db("school")
    return db
}

module.exports=getDBCon