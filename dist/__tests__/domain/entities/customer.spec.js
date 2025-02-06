"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("../../../domain/entities/customer/Address"));
const Customer_1 = __importDefault(require("../../../domain/entities/customer/Customer"));
describe('Customer', () => {
    it('should create a new customer', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        expect(customer).toBeInstanceOf(Customer_1.default);
        expect(customer._name).toBe('John Doe');
    });
    it('should throw an error when creating a customer without a name', () => {
        expect(() => new Customer_1.default('', 'john@email.com', '123-456')).toThrowError('Name is required');
    });
    it('should throw an error when creating a customer without an email', () => {
        expect(() => new Customer_1.default('John Doe', '', '123-456')).toThrowError('Email is required');
    });
    it('should set an address to the customer', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        const address = new Address_1.default('Main St', 123, '123-45', 'New York');
        customer.Address = address;
        expect(customer._address).toBeInstanceOf(Address_1.default);
    });
    it('should throw an error when activating a customer without an address', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        expect(() => customer.activate()).toThrowError('Address is required to activate customer');
    });
    it('should activate a customer', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        const address = new Address_1.default('Main St', 123, '123-45', 'New York');
        customer.Address = address;
        customer.activate();
        expect(customer._active).toBe(true);
    });
    it('should deactivate a customer', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        customer.deactivate();
        expect(customer._active).toBe(false);
    });
    it('should add reward points to the customer', () => {
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        expect(customer._rewardPoints).toBe(0);
        customer.addRewardPoints(100);
        expect(customer._rewardPoints).toBe(100);
        customer.addRewardPoints(20);
        expect(customer._rewardPoints).toBe(120);
    });
});
