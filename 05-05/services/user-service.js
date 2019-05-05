const constants = require('../commons/resources');
const adapter = require('../helpers/connect-db-adapter');

exports.create = async user => {
    try {
        const db = await adapter.getDB(constants.COLLECTIONS_NAME.USER);
        return await db.insertOne(user);
    } catch (err) {
        throw err;
    }
};

exports.findAmount = async () => {
    try {
        const db = await adapter.getDB(constants.COLLECTIONS_NAME.USER);
        return await db.countDocuments();
    } catch (err) {
        throw err;
    }
};

exports.findAll = async () => {
    try {
        const db = await adapter.getDB(constants.COLLECTIONS_NAME.USER);
        return await db.find().toArray();
    } catch (err) {
        throw err;
    }
};

exports.findOne = async id => {
    try {
        const db = await adapter.getDB(constants.COLLECTIONS_NAME.USER);
        return await db.findOne({_id: id});
    } catch (err) {
        throw err;
    }
};