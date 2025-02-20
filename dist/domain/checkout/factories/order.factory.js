"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../entities/order/Order"));
const OrderItem_1 = __importDefault(require("../entities/order/OrderItem"));
class OrderFactory {
    static create(orderProps) {
        const items = orderProps.items.map(item => {
            return new OrderItem_1.default(item.name, item.productId, item.quantity, item.price);
        });
        return new Order_1.default(orderProps.customerId, items);
    }
}
exports.default = OrderFactory;
