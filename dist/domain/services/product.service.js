"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static increasePrice(products, percentage) {
        products.forEach(product => {
            product._price += product._price * percentage / 100;
        });
    }
}
exports.default = ProductService;
