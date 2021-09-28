const Mongoose = require('mongoose');

const bookingSchema = new Mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobileNo: {type: Number, unique: true, required: true},
    query: {type: Number, required: true}
});

module.exports = Mongoose.model('booking', bookingSchema);