import Customer from "../../../../domain/customer/entities/Customer";
import Address from "../../../../domain/customer/entities/VOs/Address";
import FindCustomerUseCase from "../../../../usecase/customer/findById/findById.customer.usecase";

const customer = new Customer("John", "john@email.com", "123-456");
const address = new Address("Street", 123, "city", "zip-code");
customer._address = address;

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

describe("Find customer use case unit test", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);        

        const input = {
            id: customer._id
        }

        const output = {
            id: customer._id,
            name: customer._name,
            address: {
                street: customer._address._street,
                city: customer._address._city,
                number: customer._address._number,
                zipCode: customer._address._zipCode,
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

    it("should throw an error is customer not found", () => {
        const customerRepository = MockRepository();
        customerRepository.findById.mockImplementation(() => {
            throw new Error("Customer not found!");
        });
        const useCase = new FindCustomerUseCase(customerRepository);        

        const input = {
            id: customer._id
        }

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Customer not found!");
    });

});