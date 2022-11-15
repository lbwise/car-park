const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('BOOKINGS PAGE');
});

module.exports = router;