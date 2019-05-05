const mongoClient = require('mongodb').MongoClient;
const configs = require('../configs/configs');

let database = {db: undefined};

module.exports = database;

database.GetDB = () => {
    if (typeof database.db === 'undefined') {
        database.db = database.InitDB();
    }
    return database.db;
};

database.InitDB = async () => {
    try {
        await mongoClient.connect(configs.DB_CONFIG.URL + configs.DB_CONFIG.PORT, function (err, client) {
            console.log("Connected successfully to server");
            return client.db(configs.DB_CONFIG.DB_NAME);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

database.Disconnect = () => {
    if (database.db) {
        database.db.close();
    }
};