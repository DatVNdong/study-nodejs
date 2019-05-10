const User = require('../models/user');
const userService = require('../services/user-service');
const resources = require('../commons/resources');
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;
const collectionName = resources.COLLECTIONS_NAME.USERS;
const objectName = collectionName.slice(0, -1);

create = async (req, res, next) => {
    try {
        const body = req.body;
        const username = body.username;
        const user = new User(username, body.password);

        if (await userService.isUsernameExisted(username)) {
            return next(new Error(errorMessage.EXISTED_OBJECT_NAME(objectName)));
        }
        await userService.create(user);

        return res.json({
            message: successMessage.CREATE_OBJECT(objectName),
            data: user
        });
    } catch (err) {
        return next(err);
    }
};

findAll = async (req, res, next) => {
    try {
        const users = await userService.findAll();

        return res.json({
            message: users.length !== 0 ? successMessage.GET_LIST_OBJECTS(collectionName) : successMessage.NO_RECORDS,
            data: users
        });
    } catch (err) {
        return next(err);
    }
};

findOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.findOne(id);

        return res.json({
            message: user !== null ? successMessage.GET_OBJECT_BY_ID(objectName) : errorMessage.NOT_EXISTED_OBJECT(objectName),
            data: user
        });
    } catch (err) {
        return next(err);
    }
};

update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        let user = new User(null, body.password);

        const result = await userService.update(id, user);
        const value = result.value;
        const isExist = value !== null;
        if (isExist) {
            user.username = value.username;
        }

        return res.json({
            message: isExist ? successMessage.UPDATE_OBJECT(objectName) : errorMessage.NOT_EXISTED_OBJECT(objectName),
            data: isExist ? user : null
        });
    } catch (err) {
        return next(err);
    }
};

remove = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = JSON.parse(await userService.remove(id));

        return res.json({
            message: result.n !== 0 ? successMessage.DELETE_OBJECT(objectName) : errorMessage.NOT_EXISTED_OBJECT(objectName)
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