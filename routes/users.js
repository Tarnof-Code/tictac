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
    res.render("login")
  } else {
    let newUser = new userModel({
      name: req.body.name,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password
    })

    let userSaved = await newUser.save()
    res.redirect("/home");
  }

})

module.exports = router;
