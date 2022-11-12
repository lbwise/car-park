const express = require('express');
const mongoose = require('mongoose');
const Lot = require('../models/Lot');
const router = express.Router();

const checkAvailable = lot => {
    return true
}

router.get('/', async (req, res) => {
    // QUERY ALL LOTS
    console.log('made it')
    const lots = await Lot.find();
    console.log(lots);
    res.send(lots);
});


// Individual lot CRUD routes
router.route('/:id')
    .all((req, res, next) => {
        res.id = req.params.id;
    })
    
    .get(async (req, res) => {
        // QUERY LOT WITH ID
        // const lotID = req.params.id;
        const lot = res.id;
        const availabile = checkAvailable(lot);
        res.send(200, { lot, availabile });
    })
    
    .put(async (req, res) => {
        const data = null;
        res.redirect(202, `/lots/${res.id}`);
    })

    .post(async (req, res) => {
        res.redirect(201, `/lots/${res.id}`);
    })

    .delete(async (req, res) => {
        res.redirect(200, '/lots')
    });


module.exports = router;