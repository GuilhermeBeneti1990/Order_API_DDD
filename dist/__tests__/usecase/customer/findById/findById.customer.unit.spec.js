"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = __importDefault(require("../../../../domain/customer/entities/Customer"));
const Address_1 = __importDefault(require("../../../../domain/customer/entities/VOs/Address"));
const findById_customer_usecase_1 = __importDefault(require("../../../../usecase/customer/findById/findById.customer.usecase"));
const customer = new Customer_1.default("John", "john@email.com", "123-456");
const address = new Address_1.default("Street", 123, "city", "zip-code");
customer._address = address;
const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
};
describe("Find customer use case unit test", () => {
    it("should find a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const useCase = new findById_customer_usecase_1.default(customerRepository);
        const input = {
            id: customer._id
        };
        const output = {
            id: customer._id,
            name: customer._name,
            address: {
                street: customer._address._street,
                city: customer._address._city,
                number: customer._address._number,
                zipCode: customer._address._zipCode,
            }
        };
        const result = yield useCase.execute(input);
        expect(result).toEqual(output);
    }));
    it("should throw an error is customer not found", () => {
        const customerRepository = MockRepository();
        customerRepository.findById.mockImplementation(() => {
            throw new Error("Customer not found!");
        });
        const useCase = new findById_customer_usecase_1.default(customerRepository);
        const input = {
            id: customer._id
        };
        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Customer not found!");
    });
});
