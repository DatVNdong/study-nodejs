const mongoClient = require('mongodb').MongoClient
    , configs = require('../configs/configs')
    , database = {db: undefined};

database.getDB = async (collectionName) => {
    if (typeof database.db === 'undefined') {
        database.db = await database.initDB();
    }
    return database.db.collection(collectionName);
};

database.initDB = async () => {
    try {
        const client = await mongoClient.connect(configs.DB_CONFIG.URL + configs.DB_CONFIG.PORT);
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