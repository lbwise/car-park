const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const connectDB = require('./util/db');
const api = require('./api/routes');
const res = require('express/lib/response');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const db_add = process.env.DB_ADD;

connectDB(db_add);
// Add session into req

app.use(express.json());
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser());
app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.statusCode).send(err.message);
});

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
