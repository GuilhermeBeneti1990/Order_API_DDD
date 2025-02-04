"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../entities/product/Product"));
const product_service_1 = __importDefault(require("../../services/product.service"));
describe('ProductService', () => {
    it('should increase the price of all products by the given percentage', () => {
        // Arrange
        const products = [
            new Product_1.default('Product 1', 100),
            new Product_1.default('Product 2', 200),
            new Product_1.default('Product 3', 300),
        ];
        const percentage = 10;
        const expectedPrices = [110, 220, 330];
        // Act
        product_service_1.default.increasePrice(products, percentage);
        // Assert
        products.forEach((product, index) => {
            expect(product._price).toBe(expectedPrices[index]);
        });
    });
});
