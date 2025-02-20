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
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.findById(input.id);
            customer._name = input.name;
            customer._email = input.email;
            customer._phone = input.phone;
            customer._address._street = input.address.street;
            customer._address._number = input.address.number;
            customer._address._city = input.address.city;
            customer._address._zipCode = input.address.zipCode;
            yield this.customerRepository.update(customer);
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
exports.default = UpdateCustomerUseCase;
