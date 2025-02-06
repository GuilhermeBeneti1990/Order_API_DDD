import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/database/sequelize/model/Product.model";
import Product from "../../../domain/entities/product/Product";
import ProductRepository from "../../../infra/repositories/product.repository";

describe('ProductRepository', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('Product 1', 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: product._id } });

        expect(productModel.toJSON()).toStrictEqual({
            id: product._id,
            name: 'Product 1',
            price: 100
        });
    });

    it('should find all products', async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product('Product 1', 100);
        const product2 = new Product('Product 2', 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const products = await productRepository.findAll();

        expect(products).toHaveLength(2);
        expect(products[0]._name).toBe('Product 1');
        expect(products[0]._price).toBe(100);
        expect(products[1]._name).toBe('Product 2');
        expect(products[1]._price).toBe(200);
    });

    it('should find a product by id', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('Product 1', 100);

        await productRepository.create(product);

        const productFound = await productRepository.findById(product._id);

        expect(productFound._name).toBe('Product 1');
        expect(productFound._price).toBe(100);
    });

    it('should update a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('Product 1', 100);

        await productRepository.create(product);

        product._name = 'Product 2';
        product._price = 200;

        await productRepository.update(product);

        const productModel = await ProductModel.findOne({ where: { id: product._id } });

        expect(productModel.toJSON()).toStrictEqual({
            id: product._id,
            name: 'Product 2',
            price: 200
        });
    });

});