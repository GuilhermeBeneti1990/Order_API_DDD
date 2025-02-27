import { v4 as uuidv4 } from 'uuid';
import IProduct from './product.interface';

export default class Product implements IProduct {

    _id: string;
    _name: string;
    _price: number;

    constructor(name: string, price: number) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate() {
        if (!this._name) {
            throw new Error('Product name is required');
        }
        if (!this._price) {
            throw new Error('Price is required');
        }
        if (this._price < 0) {
            throw new Error('Price must be greater than 0');
        }
    }

    toString() {
        return `Product: ${this._name}, ${this._price}`;
    }
}