import IRepository from "../../@shared/repositories/repository.interface";
import Customer from "../entities/Customer";

export default interface ICustomerRepository extends IRepository<Customer> {}