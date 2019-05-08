const resources = require('../commons/resources');
const userService = require('../services/user-service');

exports.validateCreateUser = async (req, res, next) => {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        if (!username) {
            return next(new Error(resources.MESSAGE.ERROR.REQUIRED_FIELD('username')));
        } else if (await userService.isUsernameExisted(username)) {
            return next(new Error(resources.MESSAGE.ERROR.EXISTED_USERNAME));
        }
        if (!password) {
            return next(new Error(resources.MESSAGE.ERROR.REQUIRED_FIELD('password')));
        }

        return next();
    } catch (err) {
        return next(err);
    }
};

exports.validateUserId = (req, res, next) => {
    const userId = parseInt(req.params.id);
    return isNaN(userId) ? next(new Error(resources.MESSAGE.ERROR.INVALID_ID)) : next();
};