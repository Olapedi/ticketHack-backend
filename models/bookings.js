const { default: mongoose } = require("mongoose");

bookingSchema = mongoose.Schema({
    
})

const Booking = mongoose.model('bookings', bookingSchema)

module.exports = Booking