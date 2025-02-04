import Product from "../entities/product/Product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number) {
        products.forEach(product => {
            product._price += product._price * percentage / 100;
        });
    }
    
}