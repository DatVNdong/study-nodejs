const resources = require('../commons/resources')
    , adapter = require('../helpers/connect-db-adapter');

async function getDB() {
    return await adapter.getDB(resources.COLLECTIONS_NAME.USER);
}

exports.isUsernameExisted = async username => {
    try {
        const db = await getDB();
        const user = await db.findOne({username: username});
        return user !== null;
    } catch (err) {
        throw err;
    }
};

exports.create = async user => {
    try {
        const db = await getDB();
        return await db.insertOne(user);
    } catch (err) {
        throw err;
    }
};

exports.generateId = async () => {
    try {
        const db = await getDB();
        const users = await db.find().sort({_id: -1}).limit(1).toArray();
        return users.length === 0 ? 1 : users[0]._id + 1;
    } catch (err) {
        throw err;
    }
};

exports.findAll = async () => {
    try {
        const db = await getDB();
        return await db.find().toArray();
    } catch (err) {
        throw err;
    }
};

exports.update = async (id, user) => {
    try {
        const db = await getDB();
        return await db.replaceOne({_id: id}, user);
    } catch (err) {
        throw err;
    }
};

exports.delete = async id => {
    try {
        const db = await getDB();
        return await db.deleteOne({_id: id});
    } catch (err) {
        throw err;
    }
};

exports.findOne = async id => {
    try {
        const db = await getDB();
        return await db.findOne({_id: id});
    } catch (err) {
        throw err;
    }
};