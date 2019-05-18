const validate = require('express-validation');
const validation = require('../validations/product-validation');
const controller = require('../controllers/product-controller');
const resources = require('../commons/resources');
const route = resources.API_URL.PRODUCTS_V1;

exports.load = function (app) {
    app.post(route, validate(validation.createSchema()), controller.create); // create new product
    app.get(route, controller.findAll); // find list product
    app.get(`${route}/:id`, validate(validation.findOneSchema()), controller.findOne); // find one product by id
    app.put(`${route}/:id`, validate(validation.updateSchema()), controller.update); // update one product by id
    app.delete(`${route}/:id`, validate(validation.findOneSchema()), controller.remove); // delete one product by id
};
