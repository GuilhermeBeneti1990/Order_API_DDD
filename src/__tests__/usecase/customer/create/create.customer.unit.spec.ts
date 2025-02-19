import CreateCustomerUseCase from "../../../../usecase/customer/create/create.customer.usecase";

const input = {
    name: "John",
    email: "john@email.com",
    phone: "123-456",
    address: {
        street: "Street",
        number: 123,
        city: "City",
        zipCode: "1234-567"
    }
}

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
};

describe("Create customer use case unit test", () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            email: input.email,
            phone: input.phone,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                zipCode: input.address.zipCode
            }
        });
    });

    it("should throw an error if name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error if email is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.email = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Email is required");
    });

    it("should throw an error if street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    });

});
