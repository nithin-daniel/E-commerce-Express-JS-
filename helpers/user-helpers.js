var db=require('../config/connections')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')
const { ObjectId } = require('mongodb')
var objectId = require('mongodb').ObjectId

module.exports={
    doSignup:(userData)=>{
        //console.log(userData);
        return new Promise(async(resolve,reject)=>{
            //console.log(userData);
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
                req.session.loggedIn=true
                req.session.user=response
                res.redirect('/')
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
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('Login failed');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }
        })
    },

    addToCart:(proId,userId)=>{
        // it check whether it has a cart document 

        return new Promise(async (resolve,reject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            if(userCart){
                // If the cart exists
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({user:ObjectId(userId)},
                    {

                        $push:{products:objectId(proId)}

                    }
                ).then((response)=>{
                    resolve()
                })
            }else{
                // It will create a new cart doccument
                let cartObj={
                    user: objectId(userId),
                    products:[objectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },

    
}