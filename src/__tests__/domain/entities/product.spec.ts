import Product from "../../../domain/entities/product/Product";


describe('Product', () => {
    it('should throw an error when creating a product without a name', () => {
        expect(() => new Product('', 100)).toThrowError('Product name is required');
    });

    it('should throw an error when creating a product without a price', () => {
        expect(() => new Product('Product 1', 0)).toThrowError('Price is required');
    })

    it('should throw an error when creating a product with a negative price', () => {
        expect(() => new Product('Product 1', -100)).toThrowError('Price must be greater than 0');
    });

    it('should create a new product', () => {
        const product = new Product('Product 1', 100);
        expect(product).toBeInstanceOf(Product);
        expect(product._name).toBe('Product 1');
        expect(product._price).toBe(100);
    });
});