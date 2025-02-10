"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Product_model_1 = __importDefault(require("../../../../infra/product/repositories/sequelize/Product.model"));
const product_repository_1 = __importDefault(require("../../../../infra/product/repositories/product.repository"));
const Product_1 = __importDefault(require("../../../../domain/product/entities/Product"));
describe('ProductRepository', () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([Product_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it('should create a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default('Product 1', 100);
        yield productRepository.create(product);
        const productModel = yield Product_model_1.default.findOne({ where: { id: product._id } });
        expect(productModel.toJSON()).toStrictEqual({
            id: product._id,
            name: 'Product 1',
            price: 100
        });
    }));
    it('should find all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product1 = new Product_1.default('Product 1', 100);
        const product2 = new Product_1.default('Product 2', 200);
        yield productRepository.create(product1);
        yield productRepository.create(product2);
        const products = yield productRepository.findAll();
        expect(products).toHaveLength(2);
        expect(products[0]._name).toBe('Product 1');
        expect(products[0]._price).toBe(100);
        expect(products[1]._name).toBe('Product 2');
        expect(products[1]._price).toBe(200);
    }));
    it('should find a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default('Product 1', 100);
        yield productRepository.create(product);
        const productFound = yield productRepository.findById(product._id);
        expect(productFound._name).toBe('Product 1');
        expect(productFound._price).toBe(100);
    }));
    it('should update a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default('Product 1', 100);
        yield productRepository.create(product);
        product._name = 'Product 2';
        product._price = 200;
        yield productRepository.update(product);
        const productModel = yield Product_model_1.default.findOne({ where: { id: product._id } });
        expect(productModel.toJSON()).toStrictEqual({
            id: product._id,
            name: 'Product 2',
            price: 200
        });
    }));
});
