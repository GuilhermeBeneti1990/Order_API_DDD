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
const customer_factory_1 = __importDefault(require("../../../domain/customer/factories/customer.factory"));
const Address_1 = __importDefault(require("../../../domain/customer/entities/VOs/Address"));
class CreateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = customer_factory_1.default.createWithAddress(input.name, input.email, input.phone, new Address_1.default(input.address.street, input.address.number, input.address.city, input.address.zipCode));
            yield this.customerRepository.create(customer);
            return {
                id: customer._id,
                name: customer._name,
                email: customer._email,
                phone: customer._phone,
                address: {
                    street: customer._address._street,
                    number: customer._address._number,
                    city: customer._address._city,
                    zipCode: customer._address._zipCode,
                }
            };
        });
    }
}
exports.default = CreateCustomerUseCase;
