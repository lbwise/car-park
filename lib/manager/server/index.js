const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const connectDB = require('./util/db');
const api = require('./api/routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
console.log(PORT);

connectDB();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser());
app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});



app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
