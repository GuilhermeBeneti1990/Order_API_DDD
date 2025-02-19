import ICustomerRepository from "../../../domain/customer/repositories/customer.repository.interface";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/entities/VOs/Address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.findById(input.id);

        customer._name = input.name;
        customer._email = input.email;
        customer._phone = input.phone;
        customer._address._street = input.address.street;
        customer._address._number = input.address.number;
        customer._address._city = input.address.city;
        customer._address._zipCode = input.address.zipCode;

        await this.customerRepository.update(customer);

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
        }
    }
}