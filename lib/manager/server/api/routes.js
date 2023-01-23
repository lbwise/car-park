const express = require('express');
const lotRoutes = require('./lots');
const bookingRoutes = require('./bookings');
const router = express.Router();

router.use('/bookings', bookingRoutes);
router.use('/lots', lotRoutes);

router.get('/', (req, res) => {
    res.send('HOME PAGE');
});


module.exports = router;