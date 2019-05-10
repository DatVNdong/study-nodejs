const API_URL = {
    USERS_V1: '/api/v1/users',
    PRODUCTS_V1: '/api/v1/products'
};

const COLLECTIONS_NAME = {
    USERS: 'users',
    PRODUCTS: 'products'
};

const MESSAGE = {
    ERROR: {
        DATABASE: 'Database error.',
        /**
         * @return {string}
         */
        NOT_EXISTED_OBJECT: function (obj) {
            return `${obj} is not existed.`;
        },
        /**
         * @return {string}
         */
        EXISTED_OBJECT_NAME: function (obj) {
            return `${obj} name is existed.`;
        },
        COMMON: 'Opps, something went wrong.',
    },
    SUCCESS: {
        CONNECT_SERVER: 'Connected successfully to server',
        /**
         * @return {string}
         */
        GET_LIST_OBJECTS: function (objs) {
            return `Get list ${objs} successfully`;
        },
        /**
         * @return {string}
         */
        GET_OBJECT_BY_ID: function (obj) {
            return `Get ${obj} by Id successfully`;
        },
        /**
         * @return {string}
         */
        CREATE_OBJECT: function (obj) {
            return `Create new ${obj} successfully`;
        },
        /**
         * @return {string}
         */
        UPDATE_OBJECT: function (obj) {
            return `Update ${obj} by Id successfully`;
        },
        /**
         * @return {string}
         */
        DELETE_OBJECT: function (obj) {
            return `Remove ${obj} by Id successfully`;
        },
        NO_RECORDS: 'No records'
    }
};

module.exports = Object.freeze({
    API_URL,
    COLLECTIONS_NAME,
    MESSAGE
});