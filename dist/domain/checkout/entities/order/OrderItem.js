"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class OrderItem {
    constructor(productId, name, quantity, price) {
        this._id = (0, uuid_1.v4)();
        this._productId = productId;
        this._name = name;
        this._quantity = quantity;
        this._price = price;
        this.validate();
    }
    validate() {
        if (!this._name) {
            throw new Error('Product name is required');
        }
        if (!this._quantity) {
            throw new Error('Quantity is required');
        }
        if (!this._price) {
            throw new Error('Price is required');
        }
        if (this._quantity < 0) {
            throw new Error('Quantity must be greater than 0');
        }
        if (this._price < 0) {
            throw new Error('Price must be greater than 0');
        }
    }
    toString() {
        return `OrderItem: ${this._id}, ${this._name}, ${this._quantity}, ${this._price}`;
    }
}
exports.default = OrderItem;
