const express = require('express')
    , router = express.Router()
    , resources = require('../commons/resources')
    , userMiddleware = require('../middlewares/user-middleware')
    , userService = require('../services/user-service')
    , User = require('../models/user');

/* 1. POST /api/v1/users
    Create new user to database
*/
router.post(resources.API_URL.USER_V1, userMiddleware.validateCreateUser, async (req, res, next) => {
    try {
        const body = req.body;

        const userId = await userService.findAmount();
        const user = new User(userId, body.username, body.password);
        const result = await userService.create(user);
        return res.json({
            message: resources.MESSAGE.SUCCESS.CREATE_USER,
            data: result.ops
        });
    } catch (err) {
        return next(err);
    }
});

/* 2. GET /api/v1/users
    Get list of user from database
*/
router.get(resources.API_URL.USER_V1, async (req, res, next) => {
    try {
        const users = await userService.findAll();
        return res.json({
            message: resources.MESSAGE.SUCCESS.GET_LIST_USERS,
            data: users
        });
    } catch (err) {
        return next(err);
    }
});

/* 3. PUT /api/v1/users/:id
    Update one user by the given userId in database
*/
router.put(`${resources.API_URL.USER_V1}/:id`, userMiddleware.validateUserId, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const body = req.body;
        const username = body.username;
        const password = body.password;
        let result = {};
        let isChangeValue = false;

        const user = await userService.findOne(userId);
        if (username) {
            user.username = username;
            isChangeValue = true;
        }
        if (password) {
            user.password = password;
            isChangeValue = true;
        }
        if (isChangeValue) {
            result = await userService.update(userId, user);
        }

        return res.json({
            message: isChangeValue ? resources.MESSAGE.SUCCESS.UPDATE_USER : resources.MESSAGE.SUCCESS.NOTHING_CHANGE,
            data: isChangeValue ? result.ops : user
        });
    } catch (err) {
        return next(err);
    }
});

/* 4. DELETE /api/v1/users/:id
    Delete info of one user by the given userId
*/
router.delete(`${resources.API_URL.USER_V1}/:id`, userMiddleware.validateUserId, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);

        const result = await userService.delete(userId);
        return res.json({
            message: resources.MESSAGE.SUCCESS.DELETE_USER,
            data: result.ops
        });
    } catch (err) {
        return next(err);
    }
});

/* 5. GET /api/v1/users/:id
    Get info of one user by the given userId
*/
router.get(`${resources.API_URL.USER_V1}/:id`, userMiddleware.validateUserId, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);

        const user = await userService.findOne(userId);
        return res.json({
            message: user === null ? resources.MESSAGE.ERROR.NOT_EXISTED_USER : resources.MESSAGE.SUCCESS.GET_USER_BY_ID,
            data: user
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;