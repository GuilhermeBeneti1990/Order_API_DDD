import Product from "../entities/Product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number) {
        products.forEach(product => {
            product._price += product._price * percentage / 100;
        });
    }
    
}