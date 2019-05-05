module.exports = class User {
    constructor(_id, username, password) {
        this._id = _id;
        this.username = username;
        this.password = password;
    }

    toString() {
        console.log(`${this._id} - ${this.username}`);
    }
};