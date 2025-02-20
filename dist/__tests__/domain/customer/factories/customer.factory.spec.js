"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("../../../../domain/customer/entities/VOs/Address"));
const customer_factory_1 = __importDefault(require("../../../../domain/customer/factories/customer.factory"));
describe('Customer factory unit test', () => {
    it('should create a customer', () => {
        let customer = customer_factory_1.default.create("John", "john@email.com", "1234-567");
        expect(customer._id).toBeDefined();
        expect(customer._name).toBe("John");
        expect(customer._email).toBe("john@email.com");
        expect(customer._phone).toBe("1234-567");
        expect(customer._address).toBeUndefined();
    });
    it('should create a customer with an address', () => {
        const address = new Address_1.default("Main St", 123, "1333-000", "New York");
        let customer = customer_factory_1.default.createWithAddress("John", "john@email.com", "1234-567", address);
        expect(customer._id).toBeDefined();
        expect(customer._name).toBe("John");
        expect(customer._email).toBe("john@email.com");
        expect(customer._phone).toBe("1234-567");
        expect(customer._address).toBe(address);
    });
});
