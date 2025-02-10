"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../../../domain/checkout/entities/order/Order"));
const OrderItem_1 = __importDefault(require("../../../../domain/checkout/entities/order/OrderItem"));
describe('Order', () => {
    it('should throw an error when creating an order without a customer id', () => {
        expect(() => new Order_1.default('', [])).toThrowError('Customer id is required');
    });
    it('should throw an error when creating an order without items', () => {
        expect(() => new Order_1.default('123', [])).toThrowError('Order items are required');
    });
    it('should calculate the total of the order', () => {
        const item1 = new OrderItem_1.default('P1', 'Product 1', 1, 100);
        const item2 = new OrderItem_1.default('P2', 'Product 2', 1, 250);
        const order = new Order_1.default('123', [item1, item2]);
        expect(order._total).toBe(350);
    });
    it('should create a new order', () => {
        const item1 = new OrderItem_1.default('P1', 'Product 1', 5, 100);
        const item2 = new OrderItem_1.default('P2', 'Product 2', 10, 250);
        const order = new Order_1.default('123', [item1, item2]);
        expect(order).toBeInstanceOf(Order_1.default);
        expect(order._customerId).toBe('123');
        expect(order._items).toHaveLength(2);
        expect(order._total).toBe(3000);
    });
});
