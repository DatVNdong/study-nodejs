const {mongoose} = require('./index.js');
const collectionName = require('../commons/resources').COLLECTIONS_NAME.USERS;

const userSchema = new mongoose.Schema({
    username: {type: String, trim: true, required: true},
    password: {type: String, trim: true, required: true}
});

const User = mongoose.model(collectionName, userSchema);

module.exports = User;
