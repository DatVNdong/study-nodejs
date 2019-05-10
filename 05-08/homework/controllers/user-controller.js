const {ObjectId} = require('mongodb');
const adapter = require('../helpers/connect-db-adapter');
const User = require('../models/user');
const resources = require('../commons/resources');
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;
const collectionName = resources.COLLECTIONS_NAME.USERS;

async function getDB() {
    return await adapter.getDB(collectionName);
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

create = async (req, res, next) => {
    try {
        const body = req.body;
        const username = body.username;
        const user = new User(username, body.password);

        if (await isUsernameExisted(username)) {
            return next(new Error(errorMessage.EXISTED_USERNAME));
        }
        const db = await getDB();
        await db.insertOne(user);

        return res.json({
            message: successMessage.CREATE_USER,
            data: user
        });
    } catch (err) {
        return next(err);
    }
};

findAll = async (req, res, next) => {
    try {
        const db = await getDB();
        const users = await db.find().toArray();

        return res.json({
            message: users.length === 0 ? successMessage.NO_RECORDS : successMessage.GET_LIST_USERS,
            data: users
        });
    } catch (err) {
        return next(err);
    }
};

findOne = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const db = await getDB();
        const user = await db.findOne({_id: ObjectId(userId)});

        return res.json({
            message: user === null ? errorMessage.NOT_EXISTED_USER : successMessage.GET_USER_BY_ID,
            data: user
        });
    } catch (err) {
        return next(err);
    }
};

update = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const body = req.body;

        const db = await getDB();
        const result = await db.findOneAndUpdate({_id: ObjectId(userId)}, {$set: {password: body.password}}, {returnOriginal: false});
        const user = new User(result.value.username, result.value.password);

        return res.json({
            message: successMessage.UPDATE_USER,
            data: user
        });
    } catch (err) {
        return next(err);
    }
};

remove = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const db = await getDB();
        const result = JSON.parse(await db.deleteOne({_id: ObjectId(userId)}));

        return res.json({
            message: result.n === 0 ? errorMessage.NOT_EXISTED_USER : successMessage.DELETE_USER
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
};