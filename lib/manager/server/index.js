const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const connectDB = require('./util/db');
const api = require('./api/routes');
const ExpressError = require('./util/error');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const db_add = process.env.DB_ADD;

connectDB(db_add);
// Add session into req

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', api);

app.get('*', (req, res) => {
    throw new ExpressError('Unable to fing this page', 404);
});

app.use((err, req, res, next) => {
    const { message, statusCode = 500 } = err;  
    console.log(err.stack);
    res.status(statusCode).send(message);
});

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
