import Address from "../../../../domain/customer/entities/VOs/Address";
import CustomerFactory from "../../../../domain/customer/factories/customer.factory";

describe('Customer factory unit test', () => {

    it('should create a customer', () => {
        let customer = CustomerFactory.create("John", "john@email.com", "1234-567");

        expect(customer._id).toBeDefined();
        expect(customer._name).toBe("John");
        expect(customer._email).toBe("john@email.com");
        expect(customer._phone).toBe("1234-567");
        expect(customer._address).toBeUndefined();
    });

    it('should create a customer with an address', () => {
        const address = new Address("Main St", 123, "1333-000", "New York")
        let customer = CustomerFactory.createWithAddress("John", "john@email.com", "1234-567", address);

        expect(customer._id).toBeDefined();
        expect(customer._name).toBe("John");
        expect(customer._email).toBe("john@email.com");
        expect(customer._phone).toBe("1234-567");
        expect(customer._address).toBe(address);
    });

});