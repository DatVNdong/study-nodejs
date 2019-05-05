const constants = require('../commons/constants');
const db = require('../helpers/connect-db').GetDB().collection(constants["DB_COLLECTIONS_NAME"].USER);

exports.create = async (user) => {
    try {
        console.log('->' + db);
        const result = await db.insertOne(user, {'forceServerObjectId': false});
        return result.ops;
    } catch (error) {
        return next(error);
    }
};