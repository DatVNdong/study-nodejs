const {mongoose} = require('./index.js');
const collectionName = require('../commons/resources').COLLECTIONS_NAME.PRODUCTS;

const productSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    price: {type: Number, min: 0, required: true},
    colors: [{type: String, lowercase: true, trim: true, required: true}],
    isAvailable: {type: Boolean, required: true},
    payload: {
        releasedAt: {type: Date, default: Date.now, required: true},
        expiredAt: {type: Date, required: true}
    }
});

const Product = mongoose.model(collectionName, productSchema);

module.exports = Product;
