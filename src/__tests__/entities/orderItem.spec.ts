import OrderItem from "../../entities/order/OrderItem";

describe('OrderItem', () => {
    it('should throw an error when creating an order item without a name', () => {
        expect(() => new OrderItem('P1', '', 1, 100)).toThrowError('Product name is required');
    });

    it('should throw an error when creating an order item without a quantity', () => {
        expect(() => new OrderItem('P1', 'Product 1', 0, 100)).toThrowError('Quantity is required');
    });

    it('should throw an error when creating an order item without a price', () => {
        expect(() => new OrderItem('P1', 'Product 1', 1, 0)).toThrowError('Price is required');
    });

    it('should throw an error when creating an order item with a negative quantity', () => {
        expect(() => new OrderItem('P1', 'Product 1', -1, 100)).toThrowError('Quantity must be greater than 0');
    });

    it('should throw an error when creating an order item with a negative price', () => {
        expect(() => new OrderItem('P1', 'Product 1', 1, -100)).toThrowError('Price must be greater than 0');
    });

    it('should create a new order item', () => {
        const item = new OrderItem('P1', 'Product 1', 1, 100);
        expect(item).toBeInstanceOf(OrderItem);
        expect(item._productId).toBe('P1');
        expect(item._name).toBe('Product 1');
        expect(item._quantity).toBe(1);
        expect(item._price).toBe(100);
    });
})