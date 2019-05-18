const APP_CONFIG = {
    PORT: 3000,
    BODY_PARSE_TYPE: 'application/json'
};

const DB_CONFIG = {
    URL: 'mongodb://localhost:',
    PORT: 27017,
    DB_NAME: 'study_test'
};

const AUTHENTICATION = {
    PRIVATE_KEY: 'supernova',
    TIME_EXPIRES: 60
};

module.exports = Object.freeze({
    APP_CONFIG,
    DB_CONFIG,
    AUTHENTICATION
});
