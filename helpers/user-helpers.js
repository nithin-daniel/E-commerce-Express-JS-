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
        
    },

    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus = false
            let response = {}
            let user =await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if (user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if (status){
                        console.log('Login Success');
                    }else{
                        console.log('Login failed');
                    }
                })
            }else{
                console.log('login failed');
            }
        })
    }
}