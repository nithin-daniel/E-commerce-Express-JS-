const { response } = require('express');
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
    // console.log(id);
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

router.get('/delete-product/:id',(req,res)=>{
  let proId = req.params.id
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect("/admin")
  })
})


router.get('/edit-product/:id',async (req,res)=>{
  let product = await productHelper.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',(req,res)=>{
  // console.log(req.params.id);
  productHelper.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
  })
})
module.exports = router;
