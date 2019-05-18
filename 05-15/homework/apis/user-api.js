const validate = require('express-validation');
const validation = require('../validations/user-validation');
const controller = require('../controllers/user-controller');
const middleware = require('../middlewares/authentication-middleware');
const resourcesAPI = require('../commons/resources').API_URL;
const loginRoute = resourcesAPI.LOGIN;
const userRoute = resourcesAPI.USERS_V1;

exports.load = function (app) {
    app.post(loginRoute, controller.login); // login
    app.post(userRoute, validate(validation.createSchema()), controller.create); // create new user
    app.get(userRoute, middleware.verifyToken, controller.findAll); // find list user
    app.get(`${userRoute}/:id`, [middleware.verifyToken, validate(validation.findOneSchema())], controller.findOne); // find one user by id
    app.put(`${userRoute}/:id`, [middleware.verifyToken, validate(validation.updateSchema())], controller.update); // update one user by id
    app.delete(`${userRoute}/:id`, [middleware.verifyToken, validate(validation.findOneSchema())], controller.remove); // delete one user by id
};
