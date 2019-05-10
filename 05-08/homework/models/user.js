module.exports = class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    toString() {
        return `username: ${this.username} - password: ${this.password}`;
    }
};