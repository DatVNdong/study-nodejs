const API_URL = {
    USER_V1: '/api/v1/users'
};

const COLLECTIONS_NAME = {
    USERS: 'users'
};

const MESSAGE = {
    ERROR: {
        DATABASE: 'Database error.',
        INVALID_ID: 'Id must be an integer.',
        NOT_EXISTED_USER: 'User is not existed.',
        EXISTED_USERNAME: 'Username is existed.',
        COMMON: 'Opps, something went wrong.',
        /**
         * @return {string}
         */
        REQUIRED_FIELD: function (field) {
            return `${field} is a required field`;
        }
    },
    SUCCESS: {
        CONNECT_SERVER: 'Connected successfully to server',
        GET_LIST_USERS: 'Get list users successfully.',
        GET_USER_BY_ID: 'Get user by Id successfully.',
        CREATE_USER: 'Create new user successfully.',
        DELETE_USER: 'Remove user by Id successfully.',
        UPDATE_USER: 'Update user by Id successfully.',
        NOTHING_CHANGE: 'Nothing change'
    }
};

module.exports = Object.freeze({
    API_URL,
    COLLECTIONS_NAME,
    MESSAGE
});