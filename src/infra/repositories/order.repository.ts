import Order from "../../domain/entities/order/Order";
import OrderModel from "../database/sequelize/model/Order.model";
import OrderItemModel from "../database/sequelize/model/OrderItem.model";

export default class OrderRepository {

    async create(order: Order): Promise<void> {
        await OrderModel.create(
            {
                id: order._id,
                customer_id: order._customerId,
                total: order._total,
                items: order._items.map(item => ({
                    id: item._id,
                    product_id: item._productId,
                    order_id: order._id,
                    quantity: item._quantity,
                    name: item._name,
                    price: item._price
                }))
            },
            {
                include: [{ model: OrderItemModel }]
            }
        );
    }

}