import ICustomerRepository from "../../../domain/customer/repositories/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./findById.customer.dto";

export default class FindCustomerUseCase {
    private customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.findById(input.id);

        return {
            id: customer._id,
            name: customer._name,
            address: {
                street: customer._address._street,
                city: customer._address._city,
                number: customer._address._number,
                zipCode: customer._address._zipCode,
            }
        }
    }
}