const express = require('express');
const Booking = require('../models/Booking');
const catchAsync = require('../util/catchAsync');
const router = express.Router();
require('dotenv').config();

const getBookById = async id => {
    const book = await Booking.findById(id);
    return book
}

router.route('/:id')
    .all((req, res, next) => {
        res.id = req.params.id;
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
        const re = '(.*)\/bookings';
        const found = res.base.match(re);
        const path = `//${process.env.HOST}:${process.env.PORT + found[1]}/lots`
        res.redirect(path);
    }));


module.exports = router;