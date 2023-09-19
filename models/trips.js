const { default: mongoose } = require("mongoose")

const tripsSchema = mongoose.Schema({
    departure : String,
    arrival : String,
    departureDate : Date,
    price : number
})

const Trip = mongoose.model('trips',tripsSchema)

module.exports = Trip