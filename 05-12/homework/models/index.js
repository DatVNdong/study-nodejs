const mongoose = require('mongoose');
const {URL, PORT, DB_NAME} = require('../configs/configs').DB_CONFIG;

module.exports = {
    connectDB: function () {
        return mongoose.connect(`${URL}${PORT}/${DB_NAME}`, {useNewUrlParser: true});
    },
    mongoose
};
