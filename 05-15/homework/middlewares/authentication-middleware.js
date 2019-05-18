const jwt = require('jsonwebtoken');
const authConfig = require('../configs/configs').AUTHENTICATION;
const errorMessage = require('../commons/resources').MESSAGE.ERROR;

verifyToken = async (req, res, next) => {
    try {
        const {token} = req.query;
        if (!token) {
            return next(new Error(errorMessage.NOT_EXISTED_TOKEN));
        }
        jwt.verify(token, authConfig.PRIVATE_KEY);

        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    verifyToken
};
