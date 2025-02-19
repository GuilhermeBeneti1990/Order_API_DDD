import ICustomerRepository from "../../../domain/customer/repositories/customer.repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/entities/VOs/Address";

export default class CreateCustomerUseCase {
    private customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(
            input.name, 
            input.email, 
            input.phone, 
            new Address(
                input.address.street, 
                input.address.number, 
                input.address.city, 
                input.address.zipCode
            ));

        await this.customerRepository.create(customer);

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
    }
}