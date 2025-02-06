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
const Product_1 = __importDefault(require("../../domain/entities/product/Product"));
const Product_model_1 = __importDefault(require("../database/sequelize/model/Product.model"));
class ProductRepository {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Product_model_1.default.create({
                id: product._id,
                name: product._name,
                price: product._price
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const productModels = yield Product_model_1.default.findAll();
            return productModels.map(productModel => new Product_1.default(productModel.name, productModel.price));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productModel = yield Product_model_1.default.findOne({ where: { id } });
            return new Product_1.default(productModel.name, productModel.price);
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Product_model_1.default.update({
                name: product._name,
                price: product._price
            }, { where: { id: product._id } });
        });
    }
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
}
exports.default = ProductRepository;
