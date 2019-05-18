const {ObjectId} = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const response = require('../helpers/response');
const resources = require('../commons/resources');
const successMessage = resources.MESSAGE.SUCCESS;
const errorMessage = resources.MESSAGE.ERROR;
const collectionName = resources.COLLECTIONS_NAME.PRODUCTS;
const objectName = collectionName.slice(0, -1);

isNameExisted = async name => {
    try {
        const product = await Product.findOne({name: name});
        return product !== null;
    } catch (err) {
        return next(err);
    }
};

create = async (req, res, next) => {
    try {
        const {
            name,
            userId,
            price,
            colors,
            isAvailable,
            payload
        } = req.body;
        const product = new Product({
            name,
            userId,
            price,
            colors,
            isAvailable,
            payload
        });

        const isExistedName = await isNameExisted(name);
        if (isExistedName) {
            return next(new Error(errorMessage.EXISTED_OBJECT_NAME(objectName)));
        }
        const isExistedUserId = await User.findOne({_id: userId});
        if (!isExistedUserId) {
            return next(new Error(errorMessage.NOT_EXISTED_OBJECT(resources.COLLECTIONS_NAME.USERS.slice(0, -1))));
        }

        await product.save();

        return response.success(successMessage.CREATE_OBJECT(objectName), product, res);
    } catch (err) {
        return next(err);
    }
};

findAll = async (req, res, next) => {
    try {
        const products = await Product.find({isAvailable: true}).lean();

        if (products.length === 0) {
            return response.error(errorMessage.NO_RECORDS, undefined, res);
        }

        const userIds = products.map(product => {
            return product.userId;
        });
        const users = await User.find({_id: {$in: userIds}}).lean();
        const productsWithUsers = products.map(product => {
            const index = users.findIndex(user => {
                return user._id.toString() === product.userId.toString();
            });
            return {...product, user: users[index]};
        });

        return response.success(successMessage.GET_LIST_OBJECTS(collectionName), productsWithUsers, res);
    } catch (err) {
        return next(err);
    }
};

findOne = async (req, res, next) => {
    try {
        const {id} = req.params;

        const product = await Product.findOne({_id: id}).lean();
        if (!product) {
            response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
        }
        const user = await User.findOne({_id: product.userId}).lean();
        const productWithUser = {...product, user};

        response.success(successMessage.GET_OBJECT_BY_ID(objectName), productWithUser, res);
    } catch (err) {
        return next(err);
    }
};

update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {
            price,
            colors,
            isAvailable,
            payload
        } = req.body;

        let updateProduct = {
            price,
            colors,
            isAvailable,
            payload
        };
        Object.keys(updateProduct).forEach(function (key) {
            if (updateProduct[key] === undefined) {
                delete updateProduct[key];
            }
        });

        const updateInfo = {$set: updateProduct};
        const result = await Product.findOneAndUpdate({_id: id}, updateInfo, {
            new: true,
            useFindAndModify: false
        }).lean();
        if (result) {
            const user = await User.findOne({_id: result.userId}).lean();
            const productWithUser = {...result, user};

            return response.success(successMessage.UPDATE_OBJECT(objectName), productWithUser, res);
        }

        return response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
    } catch (err) {
        return next(err);
    }
};

remove = async (req, res, next) => {
    try {
        const {id} = req.params;

        const result = await Product.deleteOne({_id: id}).lean();

        if (result.n !== 0) {
            response.success(successMessage.DELETE_OBJECT(objectName), result, res);
        }
        response.error(errorMessage.NOT_EXISTED_OBJECT(objectName), undefined, res);
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
