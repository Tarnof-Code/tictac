var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var journeyModel = require('../models/journey')

const dotenv = require("dotenv");
dotenv.config();

const BDD_LOGIN = process.env.BDD_LOGIN;
const BDD_PASSWORD = process.env.BDD_PASSWORD;



// var journeySchema = mongoose.Schema({
//   departure: String,
//   arrival: String,
//   date: Date,
//   departureTime: String,
//   price: Number,
// });

// var journeyModel = mongoose.model('journey', journeySchema);

var city = ["Paris", "Marseille", "Nantes", "Lyon", "Rennes", "Melun", "Bordeaux", "Lille"]
var date = ["2018-11-20", "2018-11-21", "2018-11-22", "2018-11-23", "2018-11-24"]



// Login page
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


// Available page
router.get('/available', function (req, res, next) {
  if (req.session.user) {
  res.render('available', { title: 'dispo' });
} else {
  res.redirect("/")
}
});

// Home Page
router.get('/home', function (req, res, next) {
  if (req.session.user) {
    res.render('home', { title: 'home' });
  } else {
    res.redirect("/")
  }

});

// Last Trips Page
router.get('/mylast_trip', function (req, res, next) {
  if (req.session.user) {
  res.render('mylast_trip', { title: 'mylast_trip' })
} else {
  res.redirect("/")
}
});


// Tickets Page
router.get('/tickets', function (req, res, next) {
  if (req.session.user) {
  res.render('tickets', { title: 'tickets' });
} else {
  res.redirect("/")
}
});

// Saisie du choix
router.post('/home', async function (req, res, next) {

  var departureDate = req.body.departureDate
  var departureCity = req.body.departureCity
  var arrivalCity = req.body.arrivalCity

  var journey = await journeyModel.find({ departure: departureCity, arrival: arrivalCity, date: departureDate })

  console.log()
  if (journey.length == 0) {
    res.render('unavailable')
  } else {
    res.render('home', { title: 'search', journeys: journey });

  }

});

// Error
router.get('/error', function (req, res, next) {
  if (req.session.user) {
  res.render('unavailable', { title: 'Login' });
} else {
  res.redirect("/")
}
});







// Remplissage de la base de donnée, une fois suffit
// router.get('/save', async function(req, res, next) {

//   // How many journeys we want
//   var count = 300

//   // Save  ---------------------------------------------------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newUser = new journeyModel({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });

//        await newUser.save();

//     }

//   }
//   res.render('login', { title: 'Express' });
// });


// // Cette route est juste une verification du Save.
// // // Vous pouvez choisir de la garder ou la supprimer.
// router.get('/result', function(req, res, next) {

//   // Permet de savoir combien de trajets il y a par ville en base
//   for(i=0; i<city.length; i++){

//     journeyModel.find( 
//       { departure: city[i] } , //filtre

//       function (err, journey) {

//           console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
//       }
//     )

//   }


//   res.render('login', { title: 'Express' });
// });

module.exports = router;