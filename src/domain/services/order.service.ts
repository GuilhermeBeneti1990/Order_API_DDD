import Customer from "../entities/customer/Customer";
import Order from "../entities/order/Order";
import OrderItem from "../entities/order/OrderItem";

export default class OrderService {

    static calculateTotalOrder(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.calculateTotal(), 0);
    }

    static createOrder(customer: Customer, items: OrderItem[]): Order {
        if(items === null || items.length === 0) {
            throw new Error('Order items are required');
        }

        const order = new Order(customer._id, items);

        customer.addRewardPoints(order.calculateTotal() * 0.1);

        return order;
    }
    
}