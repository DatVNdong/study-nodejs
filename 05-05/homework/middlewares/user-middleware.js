const resources = require('../commons/resources');

exports.validateCreateUser = (req, res, next) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    if (!username) {
        return next(new Error(resources.MESSAGE.ERROR.REQUIRED_FIELD('username')));
    }
    if (!password) {
        return next(new Error(resources.MESSAGE.ERROR.REQUIRED_FIELD('password')));
    }
    // Cái này dùng để nhảy qua controller, không có sẽ không đi tiếp được
    return next();
};

exports.validateUserId = (req, res, next) => {
    const userId = parseInt(req.params.id);
    return isNaN(userId) ? next(new Error(resources.MESSAGE.ERROR.INVALID_ID)) : next();
};