const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: false,
        default: null,
    }
});

module.exports = model('Booking', bookingSchema);