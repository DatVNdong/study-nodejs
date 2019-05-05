module.exports = class User {
    constructor(username, password) {
        // this._id = _id;
        this.username = username;
        this.password = password;
    }

    toString() {
        console.log(`${this.username}`);
    }
};