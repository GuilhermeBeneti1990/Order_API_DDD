import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infra/product/repositories/sequelize/Product.model";
import CustomerModel from "../../../../infra/customer/repositories/sequelize/Customer.model";
import CustomerRepository from "../../../../infra/customer/repositories/customer.repository";
import ProductRepository from "../../../../infra/product/repositories/product.repository";
import Product from "../../../../domain/product/entities/Product";
import OrderItem from "../../../../domain/checkout/entities/order/OrderItem";
import Order from "../../../../domain/checkout/entities/order/Order";
import OrderModel from "../../../../infra/order/repositories/sequelize/Order.model";
import OrderItemModel from "../../../../infra/order/repositories/sequelize/OrderItem.model";
import Customer from "../../../../domain/customer/entities/Customer";
import Address from "../../../../domain/customer/entities/VOs/Address";
import OrderRepository from "../../../../infra/order/repositories/order.repository";

describe.skip('OrderRepository', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    //TODO FIX ReferenceError: Cannot access 'OrderModel' before initialization error
    it('should create a new order', async () => {
       const customerRepository = new CustomerRepository();
       const customer = new Customer('John Doe', 'john@email.com', '123-456');
       const address = new Address('Main St', 123, '123-45', 'New York');
       customer._address = address;
       await customerRepository.create(customer);

       const productRepository = new ProductRepository();
       const product = new Product('Product 1', 100);
       await productRepository.create(product);

       const orderItem = new OrderItem(product._id, product._name, 2, product._price);

       const order = new Order(customer._id, [orderItem]);

       const orderRepository = new OrderRepository();
       await orderRepository.create(order);

       const orderModel = await OrderModel.findOne({ 
            where: { id: order._id },
            include: ["items"]
        });
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: order._id,
            customerId: customer._id,
            total: 200,
            items: [
                {
                    id: orderItem._id,
                    orderId: order._id,
                    productId: product._id,
                    quantity: 2,
                    price: 100
                }
            ]
        });
    });

});