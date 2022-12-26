var db=require('../config/connections')
var collection = require('../config/collections')
module.exports={

    addProuct:(product,callback)=>{ 
        // console.log(product);

        db.get().collection('product').insertOne(product).then((data)=>{
            // console.log(data.acknowledged);
            // callback(data.ops[0])
            //  console.log(data.ops);
            callback(data.insertedId)
            
        })
    },

    getAllProducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}