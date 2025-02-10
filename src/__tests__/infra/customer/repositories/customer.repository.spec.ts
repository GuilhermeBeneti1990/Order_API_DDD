import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infra/customer/repositories/sequelize/Customer.model";
import CustomerRepository from "../../../../infra/customer/repositories/customer.repository";
import Customer from "../../../../domain/customer/entities/Customer";
import Address from "../../../../domain/customer/entities/VOs/Address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("Customer 1", "customer@email.com", "123-456");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer._id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer._id,
      name: customer._name,
      email: customer._email,
      phone: customer._phone,
      active: customer._active,
      rewardPoints: customer._rewardPoints,
      street: address._street,
      number: address._number,
      zipcode: address._zipCode,
      city: address._city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("Customer 1", "customer@email.com", "123-456");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    customer._name = "Customer 2";
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: customer._id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer._id,
      name: customer._name,
      email: customer._email,
      phone: customer._phone,
      active: customer._active,
      rewardPoints: customer._rewardPoints,
      street: address._street,
      number: address._number,
      zipcode: address._zipCode,
      city: address._city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("Customer 1", "customer@email.com", "123-456");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.findById(customer._id);
    //TODO why id is different between customer and customerResult?
    // console.log(customer);
    // console.log(customerResult);

    expect(customer._email).toStrictEqual(customerResult._email);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.findById("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("Customer 1", "customer@email.com", "123-456");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.Address = address1;
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("Customer 1", "customer@email.com", "123-456");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.Address = address2;
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers[0]._name).toStrictEqual(customer1._name);
    expect(customers[1]._name).toStrictEqual(customer2._name);
    expect(customers[0]._email).toStrictEqual(customer1._email);
    expect(customers[1]._email).toStrictEqual(customer2._email);
  });
});