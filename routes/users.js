var express = require('express');
var router = express.Router();
var productHelper  = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

// create application/x-www-form-urlencoded parser

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    console.log(products);
    res.render('user/view-products',{products})
  })


});

router.get('/login',(req,res)=>{
  res.render('user/login')
})

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  const name = req.body
  // console.log(name);
  // console.log('call camed');

  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })
})
module.exports = router;
