import Product from "../entities/product/Product";
import IRepository from "./repository.interface";

export default interface IProductRepository extends IRepository<Product> {}