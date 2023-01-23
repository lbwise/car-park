const connectDB = require('./db');
const Lot = require('../models/Lot');
const Booking = require('../models/Booking');
const dotenv = require('dotenv');
dotenv.config();
const db_add = process.env.DB_ADD;
console.log(db_add)
connectDB(db_add);

const bookings = [
    { start: new Date("2022-05-04 8:30"), end: new Date("2022-05-04 11:00") },
    { start: new Date("2022-05-04 10:00"), end: new Date("2022-05-04 10:30") },
    { start: new Date("2022-07-11 12:00"), end: new Date("2022-05-04 14:30") },
]; 

const lots = [
    {
        name: 'Frankston',
        total_lots: 30,
        latitude: 10.23,
        longitude: 123.1,
    },
    {
        name: 'St Kilda',
        total_lots: 10,
        latitude: 46.23,
        longitude: 121.1,
    },
]

async function clearAll() {
    await Lot.deleteMany({});
    await Booking.deleteMany({});
}


const setSeeds = async () => {
    await Booking.insertMany(bookings);
    lots[0].bookings = await Booking.find();
    await Lot.insertMany(lots);
    console.log("INSERTED SUCCESSFULLY")
}

setSeeds();