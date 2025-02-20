"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_factory_1 = __importDefault(require("../../../../domain/product/factories/product.factory"));
describe('Product factory unit test', () => {
    it('should create a product', () => {
        const product = product_factory_1.default.create("product", "Product 01", 10);
        expect(product._id).toBeDefined();
        expect(product._name).toBe("Product 01");
        expect(product._price).toBe(10);
        expect(product.constructor.name).toBe("Product");
    });
    it('should create an another product', () => {
        const product = product_factory_1.default.create("anotherProduct", "Product 02", 20);
        expect(product._id).toBeDefined();
        expect(product._name).toBe("Product 02");
        expect(product._price).toBe(20);
        expect(product.constructor.name).toBe("AnotherProduct");
    });
    it('should throw an error when product type is not supported', () => {
        expect(() => {
            product_factory_1.default.create("differentProduct", "Product 03", 30);
        }).toThrowError("Product type is not supported!");
    });
});
