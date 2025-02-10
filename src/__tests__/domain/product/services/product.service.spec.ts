import Product from "../../../../domain/product/entities/Product";
import ProductService from "../../../../domain/product/services/product.service";

describe('ProductService', () => {
    it('should increase the price of all products by the given percentage', () => {
        // Arrange
        const products = [
            new Product('Product 1', 100),
            new Product('Product 2', 200),
            new Product('Product 3', 300),
        ];
        const percentage = 10;
        const expectedPrices = [110, 220, 330];
        
        // Act
        ProductService.increasePrice(products, percentage);
        
        // Assert
        products.forEach((product, index) => {
            expect(product._price).toBe(expectedPrices[index]);
        });
    });
})