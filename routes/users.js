var express = require('express');
var router = express.Router();
var userModel = require("../models/users");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/sign-up", async function (req, res) {
 
    
  let exist = await userModel.findOne({ email: req.body.email })
 
  if (exist) {
    res.render("login" )
    
  } else {
    let newUser = new userModel({
      name: req.body.name,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password
    })

    let userSaved = await newUser.save()

    if (userSaved && req.session.user == undefined) {
      req.session.user = { 
        name :userSaved.name, 
        id: userSaved._id
      }
      req.session.basket=[]
    }
    
    
    res.redirect("/home");
  }
  
})

router.post("/sign-in",async function(req,res) {
  let exist = await userModel.findOne({email: req.body.email, password: req.body.password })

  
  if(exist) {
    req.session.user = {
      name: exist.name,
      id: exist._id
    }
    req.session.basket=[]
    res.redirect("/home");
   
  } else {
    res.render("login");
  
  }

  // if(exist){
  //   req.session.user = {
  //     username: exist.name,
  //     id: exist._id
      
  //   }
  // }
  
})

module.exports = router;
