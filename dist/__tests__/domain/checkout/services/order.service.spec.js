"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../../../domain/checkout/entities/order/Order"));
const OrderItem_1 = __importDefault(require("../../../../domain/checkout/entities/order/OrderItem"));
const order_service_1 = __importDefault(require("../../../../domain/checkout/services/order.service"));
const Customer_1 = __importDefault(require("../../../../domain/customer/entities/Customer"));
const Address_1 = __importDefault(require("../../../../domain/customer/entities/VOs/Address"));
describe('OrderService', () => {
    it('should calculate the total of all orders', () => {
        const item1 = new OrderItem_1.default('p1', 'Product 1', 1, 100);
        const item2 = new OrderItem_1.default('p2', 'Product 2', 1, 200);
        const order = new Order_1.default('c1', [item1]);
        const order2 = new Order_1.default('c2', [item2]);
        const total = order_service_1.default.calculateTotalOrder([order, order2]);
        expect(total).toBe(300);
    });
    it('should create a new order', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        const address = new Address_1.default('Main St', 123, '123-45', 'New York');
        customer.Address = address;
        customer.addRewardPoints = jest.fn();
        const item1 = new OrderItem_1.default('p1', 'Product 1', 5, 100);
        const item2 = new OrderItem_1.default('p2', 'Product 2', 10, 250);
        const order = order_service_1.default.createOrder(customer, [item1, item2]);
        expect(order).toBeInstanceOf(Order_1.default);
        expect(order._items).toHaveLength(2);
        expect(order._total).toBe(3000);
        expect(customer.addRewardPoints).toHaveBeenCalledWith(300);
    });
    it('should throw an error when creating an order without items', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        customer._id = 'c1';
        customer.addRewardPoints = jest.fn();
        expect(() => order_service_1.default.createOrder(customer, [])).toThrowError('Order items are required');
    });
});
