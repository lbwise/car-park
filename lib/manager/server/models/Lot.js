const { Schema, model } = require('mongoose');


const lotSchema = new Schema({

    name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },

    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    }],

    total_lots: {
        type: Number,
        required: true,
        min: [1, 'Number of lots must be a positive number'],
        max: 10000,
    },

    longitude: {
        type: Number,
        required: true,
        min: [-180, 'That longitude is too low'],
        max: [180, 'That is longitude is too high'],
    },

    latitude: {
        type: Number,
        required: true,
        min: [-180, 'That latitude is too low'],
        max: [180, 'That is latitude is too high'],
    }
});

module.exports = model('Lot', lotSchema);