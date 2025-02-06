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
const Order_model_1 = __importDefault(require("../database/sequelize/model/Order.model"));
const OrderItem_model_1 = __importDefault(require("../database/sequelize/model/OrderItem.model"));
class OrderRepository {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Order_model_1.default.create({
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
            }, {
                include: [{ model: OrderItem_model_1.default }]
            });
        });
    }
}
exports.default = OrderRepository;
