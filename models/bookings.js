const { default: mongoose } = require("mongoose");

bookingSchema = mongoose.Schema({
    departure : String,
    arrival : String,
    date : Date,
    price : number
})

const Booking = mongoose.model('bookings', bookingSchema)

module.exports = Booking