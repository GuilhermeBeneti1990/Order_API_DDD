import Order from "../entities/order/Order";
import OrderItem from "../entities/order/OrderItem";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number
    }[];
}

export default class OrderFactory {

    public static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map(item => {
            return new OrderItem(item.name, item.productId, item.quantity, item.price);
        });

        return new Order(orderProps.customerId, items);
    }

}