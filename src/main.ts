import Address from "./domain/entities/customer/Address";
import Customer from "./domain/entities/customer/Customer";
import Order from "./domain/entities/order/Order";
import OrderItem from "./domain/entities/order/OrderItem";
import Product from "./domain/entities/product/Product";

let customer = new Customer('John Doe', 'john@email.com', '123-456');
const address = new Address('Main St', 123, '123-45', 'New York');
customer.Address = address;
customer.activate();

const product = new Product('Product 1', 100);
const product2 = new Product('Product 2', 200);

const item1 = new OrderItem(product._id, product._name, 5, product._price);
const item2 = new OrderItem(product2._id, product2._name, 10, product2._price);

const order = new Order(customer._id, [item1, item2]);

console.log(customer);
console.log('==================================');
console.log(product);
console.log(product2);
console.log('==================================');
console.log(order);