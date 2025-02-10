import ProductFactory from "../../../../domain/product/factories/product.factory";

describe('Product factory unit test', () => {
    
    it('should create a product', () => {

        const product = ProductFactory.create("product", "Product 01", 10);

        expect(product._id).toBeDefined();
        expect(product._name).toBe("Product 01");
        expect(product._price).toBe(10);
        expect(product.constructor.name).toBe("Product");
        
    });

    it('should create an another product', () => {

        const product = ProductFactory.create("anotherProduct", "Product 02", 20);

        expect(product._id).toBeDefined();
        expect(product._name).toBe("Product 02");
        expect(product._price).toBe(20);
        expect(product.constructor.name).toBe("AnotherProduct");
        
    });

    it('should throw an error when product type is not supported', () => {
        expect(() => {
            ProductFactory.create("differentProduct", "Product 03", 30)
        }).toThrowError("Product type is not supported!");
    });

});