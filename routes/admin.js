var express = require('express');
var router = express.Router();
const productHelper  = require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
  })

  
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{

  productHelper.addProuct(req.body,(id)=>{
    let image=req.files.Image
     console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{

      if(!err){
        res.render("admin/add-product")
      }else{
        // console.log(err );
      }
    })
    // public/images/product-images
  })
})
module.exports = router;
