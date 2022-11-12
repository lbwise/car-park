const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const lotRoutes = require('./api/lots');

const app = express();
const PORT = 8080;

app.use(methodOverride());
app.use(bodyParser());
app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

app.get('/lots', (req, res) => {
    // QUERY ALL LOTS
    const lots = null;
    res.send(lots);

})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
