const express = require('express');
const Lot = require('../models/Lot');
const Booking = require('../models/Booking');
const ExpressError = require('../util/error');
const catchAsync = require('../util/catchAsync');
const { where } = require('../models/Lot');
const router = express.Router();

const checkAvailable = () => {
    return true
}

const checkEmpty = obj => {
    return Object.keys(obj).length === 0;
}


router.get('/:id/bookings', catchAsync(async (req, res) => {
    const lot = await Lot.findById(req.params.id, { bookings: 1 }).populate('bookings');
    if (!lot) {
        throw new ExpressError('This Lot no longer exists :(', 404);
    }
    res.status(200).send(lot.bookings);
}));


// Individual lot CRUD routes
router.route('/:id')

    .all((req, res, next) => {
        res.base = req.baseUrl;
        res.id = req.params.id;
        next();
    })

    
    // Retrieves lot info
    .get(catchAsync(async (req, res, next) => {
        const lot = await Lot.findById(res.id, { bookings: 0, __v: 0});
        if (!lot) {
            throw new ExpressError('This Lot no longer exists :(', 404);
        }
        res.status(200).send(lot);
    }))
    
    // Updates lot
    .put(catchAsync(async (req, res) => {
        await Lot.findByIdAndUpdate(res.id, req.body);
        res.redirect(`${res.base + '/' + res.id}`);
    }))

    // Deletes lot
    .delete((async (req, res) => {
        await Lot.findByIdAndRemove(res.id)
        res.status(200).redirect(res.base)
    }));


// Creates new lot
router.post('/', catchAsync(async (req, res) => {
    const data = req.body;
    console.log(data);
    const newLot = new Lot({...data});
    await newLot.save(); 
    res.redirect(`${req.baseUrl + '/' + newLot._id}`)
}));


// Finds all lots
router.get('/', catchAsync(async (req, res) => {
    const lots = await Lot.find({}, { bookings: 0, __v: 0});
    console.log(lots);
    res.status(200).send(lots);
}));


module.exports = router;