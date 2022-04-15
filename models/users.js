var mongoose = require('mongoose');

let passtravelSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    departureTime: String,
    price: Number,
    date:Date

})


let userSchema = mongoose.Schema({
    name: String, 
    firstname: String,
    email: String, 
    password: String,
    passTravels: [passtravelSchema]
    
 });

 let userModel = mongoose.model("users" , userSchema)

 module.exports = userModel;