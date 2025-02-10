import { v4 as uuid} from "uuid";
import OrderFactory from "../../../../domain/checkout/factories/order.factory";

describe('Order factory unit test', () => {

    it('should create an order', () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 01",
                    productId: uuid(),
                    quantity: 10,
                    price: 100
                }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order._id).toBeDefined();
        expect(order._customerId).toEqual(orderProps.customerId);
        expect(order._items.length).toBe(1);

    });

});