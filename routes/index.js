var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const Booking = require('../models/bookings')
const Trip = require('../models/trips')
const Cart = require('../models/cart')
const { startOfDay, endOfDay, format } = require('date-fns')


//fonction asynchrone pour crée une nouvelle reservation depuis un voyage dans le panier (et gérer la boucle) 
async function purcharseTrip(trip){

  const newBooking = new Booking({
    departure : trip.departure,
    arrival : trip.arrival,
    date : formattedDate,
    price : trip.price,
  })
  await newBooking.save()
}

//utilise depart, arrivée, date des inputs pour afficher les trajets correspondants, retourne un tableau d'objets 
router.post('/search',(req,res)=>{
  console.log('get /trip')
  const date = new Date(req.body.date)
  if(!req.body.departure || !req.body.arrival || !req.body.date){
    res.json({result : false, error : "All fields must be filled"})
  }
  else{
    Trip.find({departure : new RegExp(req.body.departure), arrival : req.body.arrival, date : { $gte: startOfDay(date), $lte: endOfDay(date) } })
    .lean()
    .then((trips)=>{

      if(trips.length === 0){
        res.json({result : false, error : "No trip found"})
      }
      else{
        trips.map(e=>e.date = format(new Date(e.date), "HH:mm"))
        res.json({result : true , trips})
      }
 
    })
  }
})

//ajoute le trajet booké au panier puis redirige vers le panier 
router.post('/toCart', (req,res)=>{
  const date = new Date(req.body.date); 
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  const bookedTrip = new Cart({
    departure : req.body.departure,
    arrival : req.body.arrival,
    date : formattedDate,
    price : req.body.price,
  })
  bookedTrip.save()
  .then((result)=>{
  window.location.assign('./cart.html')
  })
})

//route qui renvoie tous les voyages dans le panier, retourne un tableau d'objets
router.get('/cart', (req,res)=>{
  Cart.find()
  .then((cartTrips)=>res.json({cartTrips}))
})

//supprime l'élément ciblé du panier (visuel + bdd) (et actualise le total => coté front)
router.delete('/cart', (req,res)=>{
  const date = new Date(req.body.date); 
  const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  
  Cart.deleteOne({departure : req.body.departure, arrival : req.body.arrival, date : formattedDate})
  .then((deletedTrip)=>{
    if(deletedTrip.deleteCount === 0){
      res.json({result : false , error : "Trip not found"})
    }
  })
})

//route qui sauvegarde les éléments dans le panier vers les réservations puis vide le panier et envoie vers la page des réservations
router.post('/cart', (req,res)=>{
  Cart.find()
  .then((trips)=>{
    for(let trip of trips){
      purcharseTrip(trip)
    }
  })
  Cart.deleteMany()
  .then(()=>window.location.assign('./booking.html'))
})

//route qui renvoie l'intégralité des réservations
router.get('/bookings', (req,res)=>{
  Booking.find()
  .then((bookings)=>res.json({bookings}))
})

module.exports = router
