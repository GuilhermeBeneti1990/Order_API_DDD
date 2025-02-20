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
const create_customer_usecase_1 = __importDefault(require("../../../../usecase/customer/create/create.customer.usecase"));
const input = {
    name: "John",
    email: "john@email.com",
    phone: "123-456",
    address: {
        street: "Street",
        number: 123,
        city: "City",
        zipCode: "1234-567"
    }
};
const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
};
describe("Create customer use case unit test", () => {
    it("should create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        const output = yield customerCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            email: input.email,
            phone: input.phone,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zipCode: input.address.zipCode
            }
        });
    }));
    it("should throw an error if name is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.name = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    }));
    it("should throw an error if email is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.email = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Email is required");
    }));
    it("should throw an error if street is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.address.street = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    }));
});
