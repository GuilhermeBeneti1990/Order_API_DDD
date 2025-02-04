"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../entities/product/Product"));
describe('Product', () => {
    it('should throw an error when creating a product without a name', () => {
        expect(() => new Product_1.default('', 100)).toThrowError('Product name is required');
    });
    it('should throw an error when creating a product without a price', () => {
        expect(() => new Product_1.default('Product 1', 0)).toThrowError('Price is required');
    });
    it('should throw an error when creating a product with a negative price', () => {
        expect(() => new Product_1.default('Product 1', -100)).toThrowError('Price must be greater than 0');
    });
    it('should create a new product', () => {
        const product = new Product_1.default('Product 1', 100);
        expect(product).toBeInstanceOf(Product_1.default);
        expect(product._name).toBe('Product 1');
        expect(product._price).toBe(100);
    });
});
