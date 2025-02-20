"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = __importDefault(require("../entities/Customer"));
class CustomerFactory {
    static create(name, email, phone) {
        return new Customer_1.default(name, email, phone);
    }
    static createWithAddress(name, email, phone, address) {
        const customer = new Customer_1.default(name, email, phone);
        customer._address = address;
        return customer;
    }
}
exports.default = CustomerFactory;
