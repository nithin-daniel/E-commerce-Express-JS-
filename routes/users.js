var express = require('express');
var router = express.Router();
var productHelper  = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

// create application/x-www-form-urlencoded parser

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  // console.log(user);
  productHelper.getAllProducts().then((products)=>{
    // console.log(products);
    res.render('user/view-products',{products,user})
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
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})


module.exports = router;
