const { MongoClient } = require('mongodb');

const connectDB = async () => {
    const uri = 'mongodb://localhost:27017/carpark';
    const options = {
        uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('SUCCESSFULLY CONNECTED TO DB');
    } catch(err) {
        console.log('[ERROR]: could not connect to database');
        console.log(err);
    }
    return client
}

module.exports = connectDB;
