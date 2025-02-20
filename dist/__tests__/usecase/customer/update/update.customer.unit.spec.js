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
const Address_1 = __importDefault(require("../../../../domain/customer/entities/VOs/Address"));
const customer_factory_1 = __importDefault(require("../../../../domain/customer/factories/customer.factory"));
const update_customer_usecase_1 = __importDefault(require("../../../../usecase/customer/update/update.customer.usecase"));
const customer = customer_factory_1.default.createWithAddress("John", "john@email.com", "123-456", new Address_1.default("Street", 123, "City", "1234-567"));
const input = {
    id: customer._id,
    name: "John Updated",
    email: customer._email,
    phone: customer._phone,
    address: {
        street: "Street Updated",
        number: 321,
        city: customer._address._city,
        zipCode: customer._address._zipCode
    }
};
const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
};
describe("Update customer use case unit test", () => {
    it("should update a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new update_customer_usecase_1.default(customerRepository);
        const output = yield customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    }));
});
