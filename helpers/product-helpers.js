var db=require('../config/connections')
module.exports={

    addProuct:(product,callback)=>{ 
        // console.log(product);

        db.get().collection('product').insertOne(product).then((data)=>{
            // console.log(data.acknowledged);
            // callback(data.ops[0])
            //  console.log(data.ops);
            callback(data.insertedId)
             
        })
    }
}