const {ObjectId} = require('mongodb');
const resources = require('../commons/resources');
const adapter = require('../helpers/connect-db-adapter');

async function getDB() {
    return await adapter.getDB(resources.COLLECTIONS_NAME.PRODUCTS);
}

isNameExisted = async name => {
    try {
        const db = await getDB();
        const product = await db.findOne({name: name});
        return product !== null;
    } catch (err) {
        throw err;
    }
};

create = async product => {
    try {
        const db = await getDB();
        return await db.insertOne(product);
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

update = async (id, product) => {
    try {
        const db = await getDB();
        return await db.findOneAndUpdate({_id: ObjectId(id)}, {
            $set: {
                price: product.price,
                colors: product.colors,
                isAvailable: product.isAvailable,
                payload: product.payload
            }
        }, {returnOriginal: false});
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
    isNameExisted,
    create,
    findAll,
    findOne,
    update,
    remove
};