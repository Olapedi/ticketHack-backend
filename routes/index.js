var express = require('express');
var router = express.Router();

//utilise depart, arrivée, date des inputs pour afficher les trajets correspondants
router.get('/',(req,res)=>{

})

//ajoute le trajet booké au panier puis redirige vers le panier
router.post('/', (req,res)=>{

})

//route qui renvoie tous les voyages dans le panier
router.get('/cart', (req,res)=>{

})

//supprime l'élément ciblé du panier (visuel + bdd) et actualise le prix
router.delete('/cart', (req,res)=>{

})

//route qui sauvegarde les éléments dans le panier vers les réservations puis vide le panier
router.post('/cart', (req,res)=>{

})

//route qui renvoie l'intégralité des réservations
router.get('/bookings', (req,res)=>{

})

module.exports = router;
