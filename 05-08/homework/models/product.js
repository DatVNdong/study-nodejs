module.exports = class Product {
    constructor(name, userId, price, colors, isAvailable, payload) {
        this.name = name;
        this.userId = userId;
        this.price = price;
        this.colors = colors;
        this.isAvailable = isAvailable;
        this.payload = payload;
    }

    toString() {
        return `name: ${this.name} - userId: ${this.userId} - price: ${this.price} - colors: ${JSON.stringify(this.colors)} 
            - isAvailable: ${this.isAvailable} - payload: ${JSON.stringify(this.payload)}`;
    }
};