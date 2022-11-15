const { connect } = require('mongoose');

module.exports = async uri => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    connect(uri, options)
    .then(db => {
        console.log('DB CONNECTED SUCCESFFULLY');
        return db
    }) 
    .catch(err => {
        console.log('[ERROR]: COULD NOT CONENCT TO DB');
        console.log(err);
        return err
    });
}
