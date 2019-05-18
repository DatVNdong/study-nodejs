const User = require('../models/user');
const response = require('../helpers/response');
const resources = require('../commons/resources');
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;
const collectionName = resources.COLLECTIONS_NAME.USERS;
const objectName = collectionName.slice(0, -1);
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/configs').AUTHENTICATION;

login = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username}).lean();
        if (!user) {
            return response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return next(new Error(errorMessage.INCORRECT_PASSWORD));
        }
        // Generate the access token to user.
        const token = jwt.sign({username}, authConfig.PRIVATE_KEY, {expiresIn: authConfig.TIME_EXPIRES}); // data, key to verify the token

        return response.success(successMessage.LOGIN_SUCCESS, token, res);
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

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
            const salt = bcrypt.genSaltSync(2);
            const hashPassword = bcrypt.hashSync(password, salt);
            const result = await User.create({
                username,
                password: hashPassword
            });
            delete result._doc.password;

            return response.success(successMessage.CREATE_OBJECT(objectName), result, res);
        }

        return next(new Error(errorMessage.EXISTED_OBJECT_NAME(objectName)));
    } catch (err) {
        return next(err);
    }
};

findAll = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password -__v').lean();

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

        const user = await User.findOne({_id: id}, '-password -__v').lean();

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
    login,
    create,
    findAll,
    findOne,
    update,
    remove
};
