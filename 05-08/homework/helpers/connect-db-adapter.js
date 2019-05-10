const mongoClient = require('mongodb').MongoClient;
const configs = require('../configs/configs');
const database = {db: undefined};
const resources = require('../commons/resources');

database.getDB = async (collectionName) => {
    if (typeof database.db === 'undefined') {
        database.db = await initDB();
    }
    return database.db.collection(collectionName);
};

initDB = async () => {
    try {
        const client = await mongoClient.connect(configs.DB_CONFIG.URL + configs.DB_CONFIG.PORT, {useNewUrlParser: true});
        console.log(resources.MESSAGE.SUCCESS.CONNECT_SERVER);
        return client.db(configs.DB_CONFIG.DB_NAME);
    } catch (err) {
        console.log(`-> ${resources.MESSAGE.ERROR.DATABASE}: ${err}`);
        process.exit(1);
    }
};

database.disconnect = () => {
    if (database.db) {
        database.db.close();
    }
};

module.exports = database;