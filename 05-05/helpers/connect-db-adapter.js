const mongoClient = require('mongodb').MongoClient
    , configs = require('../configs/configs')
    , database = {db: undefined};

let collections = [];

database.getDB = async (collectionName) => {
    if (typeof database.db === 'undefined') {
        database.db = await initDB();
    }
    const collection = collections.find(collection => collection.name === collectionName);
    if (typeof collection === 'undefined') {
        const collectionValue = database.db.collection(collectionName);
        collections.push({
            name: collectionName,
            value: collectionValue
        });
        return collectionValue;
    }
    return collection.value;
};

initDB = async () => {
    try {
        const client = await mongoClient.connect(configs.DB_CONFIG.URL + configs.DB_CONFIG.PORT, {useNewUrlParser: true});
        console.log('Connected successfully to server');
        return client.db(configs.DB_CONFIG.DB_NAME);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

database.disconnect = () => {
    if (database.db) {
        database.db.close();
    }
};

module.exports = database;