const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , configs = require('./configs/configs')
    , resources = require('./commons/resources');

app.use(bodyParser.json({ type: configs.APP_CONFIG.BODY_PARSE_TYPE }));

app.use(require('./controllers/user-controller'));
app.use(function (err, req, res, next) {
    console.log(`-> ${resources.MESSAGE.ERROR.COMMON}: ${err.message}`);
    return res.status(400).json({
        message: resources.MESSAGE.ERROR.COMMON,
        // Muốn trả error ra cho người dùng từ res.json thì dùng error.stack hoặc stringify
        error: err.message,
        stack: err.stack
    });
});

app.listen(configs.APP_CONFIG.PORT, () => console.log(`Listening on port ${configs.APP_CONFIG.PORT}!`));