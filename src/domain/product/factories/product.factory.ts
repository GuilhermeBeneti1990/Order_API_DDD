import AnotherProduct from "../entities/AnotherProduct";
import Product from "../entities/Product";
import IProduct from "../entities/product.interface";

export default class ProductFactory {

    public static create(type: string, name: string, price: number): IProduct {
        switch (type) {
            case "product":
                return new Product(name, price);
            case "anotherProduct":
                return new AnotherProduct(name, price);
            default:
                throw new Error("Product type is not supported!");
        }
    }

}