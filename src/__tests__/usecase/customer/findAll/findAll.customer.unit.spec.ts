import Address from "../../../../domain/customer/entities/VOs/Address";
import CustomerFactory from "../../../../domain/customer/factories/customer.factory";
import ListCustomerUseCase from "../../../../usecase/customer/findAll/findAll.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John", "john@email.com", "123-456", new Address("Street", 123, "City", "1234-567"));
const customer2 = CustomerFactory.createWithAddress("Jaine", "jaine@email.com", "456-789", new Address("Street", 123, "City", "1234-567"));

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

describe("List customers use case unit test", () => {

    it("should list customers", async () => {
        const customerRepository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(customerRepository);

        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2);
    });

});