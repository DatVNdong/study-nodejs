const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const configs = require('./configs/configs');
const resources = require('./commons/resources');
const userRoute = require('./apis/user-api');
const productRoute = require('./apis/product-api');
const models = require('./models');

app.use(bodyParser.json({type: configs.APP_CONFIG.BODY_PARSE_TYPE}));

// Connect db:
models
    .connectDB()
    .then(console.log(resources.MESSAGE.SUCCESS.CONNECT_SERVER))
    .catch(err => {
        console.error(`-> ${resources.MESSAGE.ERROR.DATABASE}: ${err}`);
        process.exit(1)
    });

// Loading apis here
userRoute.load(app);
productRoute.load(app);

// Lazy load
app.use(function (err, req, res, next) {
    console.log(`-> ${resources.MESSAGE.ERROR.COMMON}: ${err.message}`);
    if (Array.isArray(err.errors)) {
        const messages = err.errors.map(item => {
            return item.messages;
        });
        return res.status(400).json({
            errors: messages
        });
    }
    return res.status(400).json({
        message: resources.MESSAGE.ERROR.COMMON,
        error: err.message,
        stack: err.stack
    });
});

app.listen(configs.APP_CONFIG.PORT, () => console.log(`Listening on port ${configs.APP_CONFIG.PORT}!`));
