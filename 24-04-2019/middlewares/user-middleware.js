const ERROR_IS_NOT_NUMBER_MESSAGE = (params) => {
    return params + 'have to be number';
};
const ERROR_FIELD_REQUIRED_MESSAGE = (params) => {
    return params + 'is required field';
};

exports.validateCreateUser = (req, res, next) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    if (!username) {
        return next(new Error(ERROR_FIELD_REQUIRED_MESSAGE('username')));
        // return res.status(400).json({
        //     message: 'username is required field',
        //     error: new Error('username_required').stack
        // });
    }
    if (!password) {
        return next(new Error(ERROR_FIELD_REQUIRED_MESSAGE('password')));
    }
    // Cái này dùng để nhảy qua controller, không có sẽ không đi tiếp được
    return next();
};

exports.validateUserId = (req, res, next) => {
    const userId = parseInt(req.params.id);
    return isNaN(userId) ? next(new Error(ERROR_IS_NOT_NUMBER_MESSAGE(userId))) : next();
}