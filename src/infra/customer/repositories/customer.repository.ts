import Customer from "../../../domain/customer/entities/Customer";
import Address from "../../../domain/customer/entities/VOs/Address";
import ICustomerRepository from "../../../domain/customer/repositories/customer.repository.interface";
import CustomerModel from "./sequelize/Customer.model";


export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity._id,
      name: entity._name,
      email: entity._email,
      phone: entity._phone,
      street: entity._address._street,
      number: entity._address._number,
      zipcode: entity._address._zipCode,
      city: entity._address._city,
      active: entity._active,
      rewardPoints: entity._rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity._name,
        email: entity._email,
        phone: entity._phone,
        street: entity._address._street,
        number: entity._address._number,
        zipcode: entity._address._zipCode,
        city: entity._address._city,
        active: entity._active,
        rewardPoints: entity._rewardPoints,
      },
      {
        where: {
          id: entity._id,
        },
      }
    );
  }

  async findById(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.name, customerModel.email, customerModel.phone);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer._address = address;
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.name, customerModels.email, customerModels.phone);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      );
      customer._address = address;
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }

  async delete(entity: Customer): Promise<void> {
    throw new Error('Method not implemented.');
  }

}