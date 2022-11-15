const express = require('express');
const Lot = require('../models/Lot');
const Booking = require('../models/Booking');
const ExpressError = require('../util/error');
const catchAsync = require('../util/catchAsync');
const router = express.Router();

const checkAvailable = () => {
    return true
}

const checkEmpty = obj => {
    return Object.keys(obj).length === 0;
}

const addLot = async data => {
    // validate first
    const lot = new Lot(data);
    await lot.save();
    return lot;
}

const getLotById = async id => {
    const lot = await Lot.findById(id);
    if (!lot) {
        throw new ExpressError('This Lot no longer exists :(', 404);
    }
    return lot;
}


// Individual lot CRUD routes
router.route('/:id')
    .all((req, res, next) => {
        res.base = req.baseUrl;
        res.id = req.params.id;
        next();
    })
    
    .get(catchAsync(async (req, res, next) => {
        const lot = await getLotById(req.params.id);
        res.status(200).send(lot);
    }))
    
    .put(async (req, res) => {
        await Lot.findByIdAndUpdate(res.id, req.body);
        res.status(202).redirect(`${res.base + '/' + res.id}`);
    })

    .delete(async (req, res) => {
        await Lot.findByIdAndRemove(res.id)
        res.status(200).redirect(res.base)
    });


router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    const newLot = new Lot({...data});
    await newLot.save(); 
    res.redirect(`${req.baseUrl + '/' + newLot._id}`)
});


router.get('/', async (req, res) => {
    // QUERY ALL LOTS
    const lots = await Lot.find().populate('bookings');
    console.log(lots);
    res.status(200).send(lots);
});


module.exports = router;