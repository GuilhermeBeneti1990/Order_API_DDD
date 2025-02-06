import Order from "../../../domain/entities/order/Order";
import OrderItem from "../../../domain/entities/order/OrderItem";


describe('Order', () => {
    it('should throw an error when creating an order without a customer id', () => {
        expect(() => new Order('', [])).toThrowError('Customer id is required');
    });

    it('should throw an error when creating an order without items', () => {
        expect(() => new Order('123', [])).toThrowError('Order items are required');
    });

    it('should calculate the total of the order', () => {
        const item1 = new OrderItem('P1', 'Product 1', 1, 100);
        const item2 = new OrderItem('P2', 'Product 2', 1, 250);
        const order = new Order('123', [item1, item2]);
        expect(order._total).toBe(350);
    })

    it('should create a new order', () => {
        const item1 = new OrderItem('P1', 'Product 1', 5, 100);
        const item2 = new OrderItem('P2','Product 2', 10, 250);
        const order = new Order('123', [item1, item2]);
        expect(order).toBeInstanceOf(Order);
        expect(order._customerId).toBe('123');
        expect(order._items).toHaveLength(2);
        expect(order._total).toBe(3000);
    });
})