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
const sequelize_typescript_1 = require("sequelize-typescript");
const Customer_model_1 = __importDefault(require("../../../infra/database/sequelize/model/Customer.model"));
const customer_repository_1 = __importDefault(require("../../../infra/repositories/customer.repository"));
const Customer_1 = __importDefault(require("../../../domain/entities/customer/Customer"));
const Address_1 = __importDefault(require("../../../domain/entities/customer/Address"));
describe("Customer repository test", () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        yield sequelize.addModels([Customer_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new Customer_1.default("Customer 1", "customer@email.com", "123-456");
        const address = new Address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        yield customerRepository.create(customer);
        const customerModel = yield Customer_model_1.default.findOne({ where: { id: customer._id } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer._id,
            name: customer._name,
            email: customer._email,
            phone: customer._phone,
            active: customer._active,
            rewardPoints: customer._rewardPoints,
            street: address._street,
            number: address._number,
            zipcode: address._zipCode,
            city: address._city,
        });
    }));
    it("should update a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new Customer_1.default("Customer 1", "customer@email.com", "123-456");
        const address = new Address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        yield customerRepository.create(customer);
        customer._name = "Customer 2";
        yield customerRepository.update(customer);
        const customerModel = yield Customer_model_1.default.findOne({ where: { id: customer._id } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer._id,
            name: customer._name,
            email: customer._email,
            phone: customer._phone,
            active: customer._active,
            rewardPoints: customer._rewardPoints,
            street: address._street,
            number: address._number,
            zipcode: address._zipCode,
            city: address._city,
        });
    }));
    it("should find a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new Customer_1.default("Customer 1", "customer@email.com", "123-456");
        const address = new Address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        yield customerRepository.create(customer);
        const customerResult = yield customerRepository.findById(customer._id);
        //TODO why id is different between customer and customerResult?
        // console.log(customer);
        // console.log(customerResult);
        expect(customer._email).toStrictEqual(customerResult._email);
    }));
    it("should throw an error when customer is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield customerRepository.findById("456ABC");
        })).rejects.toThrow("Customer not found");
    }));
    it("should find all customers", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer1 = new Customer_1.default("Customer 1", "customer@email.com", "123-456");
        const address1 = new Address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();
        const customer2 = new Customer_1.default("Customer 1", "customer@email.com", "123-456");
        const address2 = new Address_1.default("Street 2", 2, "Zipcode 2", "City 2");
        customer2.Address = address2;
        customer2.addRewardPoints(20);
        yield customerRepository.create(customer1);
        yield customerRepository.create(customer2);
        const customers = yield customerRepository.findAll();
        expect(customers).toHaveLength(2);
        expect(customers[0]._name).toStrictEqual(customer1._name);
        expect(customers[1]._name).toStrictEqual(customer2._name);
        expect(customers[0]._email).toStrictEqual(customer1._email);
        expect(customers[1]._email).toStrictEqual(customer2._email);
    }));
});
