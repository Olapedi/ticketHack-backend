const { default: mongoose } = require("mongoose")

const cartSchema = mongoose.Schema({
    trip:
})

const Cart = mongoose.model('carts',cartSchema)

module.exports = Cart