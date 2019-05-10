const {ObjectId} = require('mongodb');
const resources = require('../commons/resources');
const adapter = require('../helpers/connect-db-adapter');

async function getDB() {
    return await adapter.getDB(resources.COLLECTIONS_NAME.USERS);
}

isUsernameExisted = async username => {
    try {
        const db = await getDB();
        const user = await db.findOne({username: username});
        return user !== null;
    } catch (err) {
        throw err;
    }
};

create = async user => {
    try {
        const db = await getDB();
        return await db.insertOne(user);
    } catch (err) {
        throw err;
    }
};

findAll = async () => {
    try {
        const db = await getDB();
        return await db.find().toArray();
    } catch (err) {
        throw err;
    }
};

findOne = async id => {
    try {
        const db = await getDB();
        return await db.findOne({_id: ObjectId(id)});
    } catch (err) {
        throw err;
    }
};

update = async (id, user) => {
    try {
        const db = await getDB();
        return await db.findOneAndUpdate({_id: ObjectId(id)}, {$set: {password: user.password}}, {returnOriginal: false});
    } catch (err) {
        throw err;
    }
};

remove = async id => {
    try {
        const db = await getDB();
        return await db.deleteOne({_id: ObjectId(id)});
    } catch (err) {
        throw err;
    }
};

module.exports = {
    isUsernameExisted,
    create,
    findAll,
    findOne,
    update,
    remove
};