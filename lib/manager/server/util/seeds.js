const connectDB = require('./db');
const Lot = require('../models/Lot');




const data = [
    {
        name: 'Frankston',
        latitude: 100.23,
        longitude: 123.1,
    },
    {
        name: 'St Kilda',
        latitude: 101.23,
        longitude: 121.1,
    },
]

const setSeeds = async () => {
    await Lot.insertMany(data);
    await Lot.bulkSave();
}

setSeeds();