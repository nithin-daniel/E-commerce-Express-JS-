var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  let products = [
    {
      name:"I Phone 11",
      category:'Mobile',
      description:'This is a good phone',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name:"OnePlus 7 Pro ",
      category:'Mobile',
      description:'This is a good phone',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name:"OPPO Reno3 Pro",
      category:'Mobile',
      description:'This is a good phone',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name:"Xiaomi Redmi Note 9 Pro",
      category:'Mobile',
      description:'This is a good phone',
      image: 'data:image/jpeg;base64,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'
    }
  ]

  res.render('admin/view-products',{admin:true,products})
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
})
module.exports = router;
