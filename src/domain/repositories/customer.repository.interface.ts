import Customer from "../entities/customer/Customer";
import IRepository from "./repository.interface";

export default interface ICustomerRepository extends IRepository<Customer> {}