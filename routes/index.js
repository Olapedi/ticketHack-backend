var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Booking = require('../models/bookings')
const Trip = require('../models/trips')
const Cart = require('../models/cart')
const connect = require('../models/connection')
const { startOfDay, endOfDay } = require('date-fns')


//fonction asynchrone pour crée une nouvelle reservation depuis un voyage dans le panier (et gérer la boucle)
async function purcharseTrip(trip){
  const newBooking = new Booking({
    departure : req.body.departure,
    arrival : req.body.arrival,
    date : req.body.date,
    price : req.body.price,
  })
  await newBooking.save()
}

//utilise depart, arrivée, date des inputs pour afficher les trajets correspondants, retourne un tableau d'objets
router.get('/c',(req,res)=>{
  date = new Date(req.body.date)
  Trip.findOne({departure : req.body.departure, arrival : req.body.arrival, date : { $gte: startOfDay(date), $lte: endOfDay(date) } })
  .then((trips)=>res.json({trips}))
  
})

//ajoute le trajet booké au panier puis redirige vers le panier
router.post('/', (req,res)=>{
  const bookedTrip = new Cart({
    departure : req.body.departure,
    arrival : req.body.arrival,
    date : req.body.date,
    price : req.body.price,
  })
  bookedTrip.save()
  .then(()=>window.location.assign('../cart/cart.html'))
})

//route qui renvoie tous les voyages dans le panier, retourne un tableau d'objets
router.get('/cart', (req,res)=>{
  Cart.find()
  .then((cartTrips)=>res.json({cartTrips}))
})

//supprime l'élément ciblé du panier (visuel + bdd) et actualise le prix
router.delete('/cart', (req,res)=>{
  Cart.deleteOne({departure : req.body.departure, arrival : req.body.arrival, date : req.body.date})
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
