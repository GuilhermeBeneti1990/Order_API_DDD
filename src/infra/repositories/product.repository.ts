import Product from "../../domain/entities/product/Product";
import IProductRepository from "../../domain/repositories/product.repository.interface";
import ProductModel from "../database/sequelize/model/Product.model";

export default class ProductRepository implements IProductRepository {
    
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product._id,
            name: product._name,
            price: product._price
        });
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(productModel => new Product(productModel.name, productModel.price));
    }

    async findById(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id } });

        return new Product(productModel.name, productModel.price);
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update({
            name: product._name,
            price: product._price
        }, { where: { id: product._id } });
    }

    async delete(entity: Product): Promise<void> {
        throw new Error('Method not implemented.');
    }

}