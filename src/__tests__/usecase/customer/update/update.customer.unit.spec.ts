import Address from "../../../../domain/customer/entities/VOs/Address";
import CustomerFactory from "../../../../domain/customer/factories/customer.factory";
import UpdateCustomerUseCase from "../../../../usecase/customer/update/update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", "john@email.com", "123-456", new Address("Street", 123, "City", "1234-567"));

const input = {
    id: customer._id,
    name: "John Updated",
    email: customer._email,
    phone: customer._phone,
    address: {
        street: "Street Updated",
        number: 321,
        city: customer._address._city,
        zipCode: customer._address._zipCode
    }
}

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

describe("Update customer use case unit test", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

});