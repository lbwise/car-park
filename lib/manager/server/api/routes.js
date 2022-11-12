const express = require('express');
const lotRoutes = require('./lots');
const router = express.Router();

router.use('/lots', lotRoutes);

router.get('/', (req, res) => {
    res.send('HOME PAGE');
});

module.exports = router;