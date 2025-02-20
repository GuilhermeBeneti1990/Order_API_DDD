"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnotherProduct_1 = __importDefault(require("../entities/AnotherProduct"));
const Product_1 = __importDefault(require("../entities/Product"));
class ProductFactory {
    static create(type, name, price) {
        switch (type) {
            case "product":
                return new Product_1.default(name, price);
            case "anotherProduct":
                return new AnotherProduct_1.default(name, price);
            default:
                throw new Error("Product type is not supported!");
        }
    }
}
exports.default = ProductFactory;
