"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const order_factory_1 = __importDefault(require("../../../../domain/checkout/factories/order.factory"));
describe('Order factory unit test', () => {
    it('should create an order', () => {
        const orderProps = {
            id: (0, uuid_1.v4)(),
            customerId: (0, uuid_1.v4)(),
            items: [
                {
                    id: (0, uuid_1.v4)(),
                    name: "Product 01",
                    productId: (0, uuid_1.v4)(),
                    quantity: 10,
                    price: 100
                }
            ]
        };
        const order = order_factory_1.default.create(orderProps);
        expect(order._id).toBeDefined();
        expect(order._customerId).toEqual(orderProps.customerId);
        expect(order._items.length).toBe(1);
    });
});
