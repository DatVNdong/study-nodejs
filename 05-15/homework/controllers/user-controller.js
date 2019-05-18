const User = require('../models/user');
const response = require('../helpers/response');
const resources = require('../commons/resources');
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;
const collectionName = resources.COLLECTIONS_NAME.USERS;
const objectName = collectionName.slice(0, -1);

isUsernameExisted = async username => {
    try {
        const user = await User.findOne({username: username}).lean();
        return user !== null;
    } catch (err) {
        return next(err);
    }
};

create = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const isExistedUsername = await isUsernameExisted(username);
        if (!isExistedUsername) {
            const newUser = new User({username, password});
            await newUser.save();
            return response.success(successMessage.CREATE_OBJECT(objectName), newUser, res);
        }

        return next(new Error(errorMessage.EXISTED_OBJECT_NAME(objectName)));
    } catch (err) {
        return next(err);
    }
};

findAll = async (req, res, next) => {
    try {
        const users = await User.find().lean();

        if (users.length !== 0) {
            return response.success(successMessage.GET_LIST_OBJECTS(collectionName), users, res);
        }
        return response.error(errorMessage.NO_RECORDS, undefined, res);
    } catch (err) {
        return next(err);
    }
};

findOne = async (req, res, next) => {
    try {
        const {id} = req.params;

        const user = await User.findOne({_id: id}).lean();

        if (user !== null) {
            return response.success(successMessage.GET_OBJECT_BY_ID(objectName), user, res);
        }
        return response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
    } catch (err) {
        return next(err);
    }
};

update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {password} = req.body;

        let updateUser = {
            password
        };
        Object.keys(updateUser).forEach(function (key) {
            if (updateUser[key] === undefined) {
                delete updateUser[key];
            }
        });

        const updateInfo = {$set: updateUser};
        const result = await User.findOneAndUpdate({_id: id}, updateInfo, {new: true}).lean();
        if (result) {
            return response.success(successMessage.UPDATE_OBJECT(objectName), result, res);
        }

        return response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
    } catch (err) {
        return next(err);
    }
};

remove = async (req, res, next) => {
    try {
        const {id} = req.params;

        const result = await User.deleteOne({_id: id}).lean();

        if (result.n !== 0) {
            return response.success(successMessage.DELETE_OBJECT(objectName), result, res);
        }
        return response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
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
