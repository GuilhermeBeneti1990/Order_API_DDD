import { Order } from "sequelize";
import IRepository from "../../@shared/repositories/repository.interface";

export default interface IOrderRepository extends IRepository<Order> {

}