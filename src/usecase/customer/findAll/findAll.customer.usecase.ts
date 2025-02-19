import ICustomerRepository from "../../../domain/customer/repositories/customer.repository.interface";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/entities/VOs/Address";
import { InputListCustomerDto, OutputListCustomerDto } from "./findAll.customer.dto";
import Customer from "../../../domain/customer/entities/Customer";

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map(customer => ({
                id: customer._id,
                name: customer._name,
                email: customer._email,
                phone: customer._phone,
                address: {
                    street: customer._address._street,
                    number: customer._address._number,
                    city: customer._address._city,
                    zipCode: customer._address._zipCode
                }
            }))
        };
    }
}

export default class ListCustomerUseCase {
    private customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
       const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutput(customers);
    }
}