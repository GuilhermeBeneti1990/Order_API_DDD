import Customer from "../entities/Customer";
import Address from "../entities/VOs/Address";

export default class CustomerFactory {

    public static create(name: string, email: string, phone: string): Customer {
        return new Customer(name, email, phone);
    }

    public static createWithAddress(name: string, email: string, phone: string, address: Address): Customer {
        const customer = new Customer(name, email, phone);
        customer._address = address;
        return customer;
    }

}