var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const Booking = require('../models/bookings')
const Trip = require('../models/trips')
const Cart = require('../models/cart')
const { startOfDay, endOfDay, format } = require('date-fns')


//fonction asynchrone pour crée une nouvelle reservation depuis un voyage dans le panier (et gérer la boucle) 
async function purcharseTrip(trip){
  const date = new Date(trip.date); 
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  const newBooking = new Booking({
    departure : trip.departure,
    arrival : trip.arrival,
    date : formattedDate,
    price : trip.price,
  })
  await newBooking.save()
}

//utilise depart, arrivée, date des inputs pour afficher les trajets correspondants, retourne un tableau d'objets 
router.get('/trip',(req,res)=>{
  console.log('get /trip')
  const date = new Date(req.params.date)
  
  Trip.find({departure : req.body.departure, arrival : req.body.arrival, date : { $gte: startOfDay(date), $lte: endOfDay(date) } })
  .then((trips)=>res.json({trips}))
  
})

//ajoute le trajet booké au panier puis redirige vers le panier 
router.post('/trip', (req,res)=>{
  const date = new Date(req.body.date); 
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  const bookedTrip = new Cart({
    departure : req.body.departure,
    arrival : req.body.arrival,
    date : formattedDate,
    price : req.body.price,
  })
  bookedTrip.save()
  .then(()=>window.location.assign('./cart.html'))
})

//route qui renvoie tous les voyages dans le panier, retourne un tableau d'objets
router.get('/cart', (req,res)=>{
  Cart.find()
  .then((cartTrips)=>res.json({cartTrips}))
})

//supprime l'élément ciblé du panier (visuel + bdd) et actualise le prix !DATE
router.delete('/cart', (req,res)=>{
  const date = new Date(req.body.date); 
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  
  Cart.deleteOne({departure : req.body.departure, arrival : req.body.arrival, date : formattedDate})
})

//route qui sauvegarde les éléments dans le panier vers les réservations puis vide le panier
router.post('/cart', (req,res)=>{
  Cart.find()
  .then((trips)=>{
    for(let trip of trips){
      purcharseTrip(trip)
    }
  })
  Cart.deleteMany()
})

//route qui renvoie l'intégralité des réservations
router.get('/bookings', (req,res)=>{
  Booking.find()
  .then((bookings)=>res.json({bookings}))
})

module.exports = router;
