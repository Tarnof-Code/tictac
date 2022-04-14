var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String, 
    firstname: String,
    email: String, 
    password: String
    
 });

 let userModel = mongoose.model("users" , userSchema)

 module.exports = userModel;