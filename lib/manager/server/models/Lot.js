const { Schema, model } = require('mongoose');

const lotSchema = new Schema({
    name: String,
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    }
});

module.exports = model('Lot', lotSchema);