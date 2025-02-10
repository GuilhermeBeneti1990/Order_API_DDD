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
const Customer_1 = __importDefault(require("../../../domain/customer/entities/Customer"));
const Address_1 = __importDefault(require("../../../domain/customer/entities/VOs/Address"));
const Customer_model_1 = __importDefault(require("./sequelize/Customer.model"));
class CustomerRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Customer_model_1.default.create({
                id: entity._id,
                name: entity._name,
                email: entity._email,
                phone: entity._phone,
                street: entity._address._street,
                number: entity._address._number,
                zipcode: entity._address._zipCode,
                city: entity._address._city,
                active: entity._active,
                rewardPoints: entity._rewardPoints,
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Customer_model_1.default.update({
                name: entity._name,
                email: entity._email,
                phone: entity._phone,
                street: entity._address._street,
                number: entity._address._number,
                zipcode: entity._address._zipCode,
                city: entity._address._city,
                active: entity._active,
                rewardPoints: entity._rewardPoints,
            }, {
                where: {
                    id: entity._id,
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let customerModel;
            try {
                customerModel = yield Customer_model_1.default.findOne({
                    where: {
                        id,
                    },
                    rejectOnEmpty: true,
                });
            }
            catch (error) {
                throw new Error("Customer not found");
            }
            const customer = new Customer_1.default(customerModel.name, customerModel.email, customerModel.phone);
            const address = new Address_1.default(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            customer._address = address;
            return customer;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerModels = yield Customer_model_1.default.findAll();
            const customers = customerModels.map((customerModels) => {
                let customer = new Customer_1.default(customerModels.name, customerModels.email, customerModels.phone);
                customer.addRewardPoints(customerModels.rewardPoints);
                const address = new Address_1.default(customerModels.street, customerModels.number, customerModels.zipcode, customerModels.city);
                customer._address = address;
                if (customerModels.active) {
                    customer.activate();
                }
                return customer;
            });
            return customers;
        });
    }
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
}
exports.default = CustomerRepository;
