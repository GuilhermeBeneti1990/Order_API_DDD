"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class AnotherProduct {
    constructor(name, price) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this.validate();
    }
    validate() {
        if (!this._name) {
            throw new Error('Product name is required');
        }
        if (!this._price) {
            throw new Error('Price is required');
        }
        if (this._price < 0) {
            throw new Error('Price must be greater than 0');
        }
    }
    toString() {
        return `Product: ${this._name}, ${this._price}`;
    }
}
exports.default = AnotherProduct;
