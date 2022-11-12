const { Schema, model, ObjectId } = require('mongoose');

const bookingSchema = new Schema({
    lot: {
        require: true,
        typeof: ObjectId,
    },
    start: {
        required: true,
        typeof: Date,
    },
    end: {
        typeof: Date,
        required: false,
        default: null,
    }
});

module.exports = model('Booking', bookingSchema);