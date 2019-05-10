const {ObjectId} = require('mongodb');
const Product = require('../models/product');
const productService = require('../services/product-service');
const userService = require('../services/user-service');
const resources = require('../commons/resources');
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;
const collectionName = resources.COLLECTIONS_NAME.PRODUCTS;
const objectName = collectionName.slice(0, -1);

create = async (req, res, next) => {
    try {
        const body = req.body;
        const name = body.name;
        const userId = ObjectId(body.userId);
        const product = new Product(name, userId, body.price, body.colors, body.isAvailable, body.payload);

        if (await productService.isNameExisted(name)) {
            return next(new Error(errorMessage.EXISTED_OBJECT_NAME(objectName)));
        }
        if (await userService.findOne(userId) === null) {
            return next(new Error(errorMessage.NOT_EXISTED_OBJECT(resources.COLLECTIONS_NAME.USERS.slice(0, -1))));
        }
        await productService.create(product);

        return res.json({
            message: successMessage.CREATE_OBJECT(objectName),
            data: product
        });
    } catch (err) {
        return next(err);
    }
};

findAll = async (req, res, next) => {
    try {
        const products = await productService.findAll();

        return res.json({
            message: products.length !== 0 ? successMessage.GET_LIST_OBJECTS(collectionName) : successMessage.NO_RECORDS,
            data: products
        });
    } catch (err) {
        return next(err);
    }
};

findOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await productService.findOne(id);

        return res.json({
            message: product !== null ? successMessage.GET_OBJECT_BY_ID(objectName) : errorMessage.NOT_EXISTED_OBJECT(objectName),
            data: product
        });
    } catch (err) {
        return next(err);
    }
};

update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        let product = new Product(null, null, body.price, body.colors, body.isAvailable, body.payload);

        const result = await productService.update(id, product);
        const value = result.value;
        const isExist = value !== null;
        if (isExist) {
            product.name = value.name;
            product.userId = value.userId;
        }

        return res.json({
            message: isExist ? successMessage.UPDATE_OBJECT(objectName) : errorMessage.NOT_EXISTED_OBJECT(objectName),
            data: isExist ? product : null
        });
    } catch (err) {
        return next(err);
    }
};

remove = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = JSON.parse(await productService.remove(id));

        return res.json({
            message: result.n !== 0 ? successMessage.DELETE_OBJECT(objectName) : errorMessage.NOT_EXISTED_OBJECT(objectName)
        });
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