"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../entities/order/Order"));
class OrderService {
    static calculateTotalOrder(orders) {
        return orders.reduce((total, order) => total + order.calculateTotal(), 0);
    }
    static createOrder(customer, items) {
        if (items === null || items.length === 0) {
            throw new Error('Order items are required');
        }
        const order = new Order_1.default(customer._id, items);
        customer.addRewardPoints(order.calculateTotal() * 0.1);
        return order;
    }
}
exports.default = OrderService;
