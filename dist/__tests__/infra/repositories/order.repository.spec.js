"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Order_model_1 = __importDefault(require("../../../infra/database/sequelize/model/Order.model"));
const Product_model_1 = __importDefault(require("../../../infra/database/sequelize/model/Product.model"));
const OrderItem_model_1 = __importDefault(require("../../../infra/database/sequelize/model/OrderItem.model"));
const Customer_model_1 = __importDefault(require("../../../infra/database/sequelize/model/Customer.model"));
const customer_repository_1 = __importDefault(require("../../../infra/repositories/customer.repository"));
const Customer_1 = __importDefault(require("../../../domain/entities/customer/Customer"));
const Address_1 = __importDefault(require("../../../domain/entities/customer/Address"));
const product_repository_1 = __importDefault(require("../../../infra/repositories/product.repository"));
const Product_1 = __importDefault(require("../../../domain/entities/product/Product"));
const OrderItem_1 = __importDefault(require("../../../domain/entities/order/OrderItem"));
const Order_1 = __importDefault(require("../../../domain/entities/order/Order"));
const order_repository_1 = __importDefault(require("../../../infra/repositories/order.repository"));
describe.skip('OrderRepository', () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        yield sequelize.addModels([Customer_model_1.default, Order_model_1.default, OrderItem_model_1.default, Product_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    //TODO FIX ReferenceError: Cannot access 'OrderModel' before initialization error
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new Customer_1.default('John Doe', 'john@email.com', '123-456');
        const address = new Address_1.default('Main St', 123, '123-45', 'New York');
        customer._address = address;
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default('Product 1', 100);
        yield productRepository.create(product);
        const orderItem = new OrderItem_1.default(product._id, product._name, 2, product._price);
        const order = new Order_1.default(customer._id, [orderItem]);
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order);
        const orderModel = yield Order_model_1.default.findOne({
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
    }));
});
