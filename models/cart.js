const { default: mongoose } = require("mongoose")

const cartSchema = mongoose.Schema({
    departure : String,
    arrival : String,
    date : Date,
    price : number})

const Cart = mongoose.model('carts',cartSchema)

module.exports = Cart