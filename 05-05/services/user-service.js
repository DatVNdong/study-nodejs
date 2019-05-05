const constants = require('../commons/constants');
const adapter = require('../helpers/connect-db');

exports.create = async user => {
    try {
        const db = await adapter.getDB(constants.DB_COLLECTIONS_NAME.USER);
        const result = await db.insertOne(user, {'forceServerObjectId': false});
        return result.ops;
    } catch (error) {
        return error;
    }
};