import IRepository from "../../@shared/repositories/repository.interface";
import Product from "../entities/Product";


export default interface IProductRepository extends IRepository<Product> {}