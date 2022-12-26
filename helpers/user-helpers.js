var db=require('../config/connections')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        //console.log(userData);
        return new Promise(async(resolve,reject)=>{
            //console.log(userData);
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
            })
        })
        
    }
}