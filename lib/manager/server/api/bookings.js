const express = require('express');
const Booking = require('../models/Booking');
const Lot = require('../models/Lot');
const catchAsync = require('../util/catchAsync');
const ExpressError = require('../util/error');
const router = express.Router({ mergeParams: true });


const getBookById = async id => {
    const book = await Booking.findById(id);
    return book
}

router.get('/', catchAsync(async (req, res) => {
    console.log(req.params);
    const lot = await Lot.findById(req.params.lotId, { bookings: 1 }).populate('bookings');
    if (!lot) {
        throw new ExpressError('This Lot no longer exists :(', 404);
    }
    res.status(200).send(lot.bookings);
}));


router.route('/:bookId')
    .all((req, res, next) => {
        res.id = req.params.bookId;
        res.base = req.baseUrl;
        next();
    })

    .get(async (req, res) => {
        const booking = await getBookById(res.id);
        res.status(200).send(booking); 
    })

    .put(catchAsync(async (req, res) => {
        const data = req.body;
        await Booking.findByIdAndUpdate(res.id, data);
        res.redirect(`${res.base + '/' + res.id}`)
    }))

    .delete(catchAsync(async (req, res) => {
        await Booking.findByIdAndDelete(res.id);
        res.redirect(`${res.base}`);
    }));


module.exports = router;