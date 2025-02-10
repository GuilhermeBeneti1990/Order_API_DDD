"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Order {
    constructor(customerId, items) {
        this._id = (0, uuid_1.v4)();
        this._customerId = customerId;
        this._items = items;
        this._total = this.calculateTotal();
        this.validate();
    }
    validate() {
        if (!this._customerId) {
            throw new Error('Customer id is required');
        }
        if (!this._items || !this._items.length) {
            throw new Error('Order items are required');
        }
    }
    calculateTotal() {
        return this._items.reduce((total, item) => total + item._price * item._quantity, 0);
    }
}
exports.default = Order;
