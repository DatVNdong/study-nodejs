const express = require('express');
const router = express.Router();
const resources = require('../commons/resources');
const userMiddleware = require('../middlewares/user-middleware');
const userService = require('../services/user-service');
const User = require('../models/user');
const userRoute = resources.API_URL.USER_V1;
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;

/* 1. POST /api/v1/users
    Create new user to database
*/
router.post(userRoute, userMiddleware.validateCreateUser, async (req, res, next) => {
    try {
        const body = req.body;

        const user = new User(await userService.generateId(), body.username, body.password);
        const result = await userService.create(user);
        return res.json({
            message: successMessage.CREATE_USER,
            data: result.ops
        });
    } catch (err) {
        return next(err);
    }
});

/* 2. GET /api/v1/users
    Get list of user from database
*/
router.get(userRoute, async (req, res, next) => {
    try {
        const users = await userService.findAll();
        return res.json({
            message: successMessage.GET_LIST_USERS,
            data: users
        });
    } catch (err) {
        return next(err);
    }
});

/* 3. PUT /api/v1/users/:id
    Update one user by the given userId in database
*/
router.put(`${userRoute}/:id`, userMiddleware.validateUserId, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const body = req.body;
        const password = body.password;
        let result = {};
        let isChangeValue = false;

        const user = await userService.findOne(userId);
        if (user === null) {
            return res.json({
                message: errorMessage.NOT_EXISTED_USER,
            });
        }
        if (password) {
            user.password = password;
            isChangeValue = true;
        }
        if (isChangeValue) {
            result = await userService.update(userId, user);
        }

        return res.json({
            message: isChangeValue ? successMessage.UPDATE_USER : successMessage.NOTHING_CHANGE,
            data: result.ops
        });
    } catch (err) {
        return next(err);
    }
});

/* 4. DELETE /api/v1/users/:id
    Delete info of one user by the given userId
*/
router.delete(`${userRoute}/:id`, userMiddleware.validateUserId, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);

        const result = JSON.parse(await userService.delete(userId));
        return res.json({
            message: result.n === 0 ? errorMessage.NOT_EXISTED_USER : successMessage.DELETE_USER
        });
    } catch (err) {
        return next(err);
    }
});

/* 5. GET /api/v1/users/:id
    Get info of one user by the given userId
*/
router.get(`${userRoute}/:id`, userMiddleware.validateUserId, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);

        const user = await userService.findOne(userId);
        return res.json({
            message: user === null ? errorMessage.NOT_EXISTED_USER : successMessage.GET_USER_BY_ID,
            data: user
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;