import { v4 as uuidv4 } from 'uuid';

export default class OrderItem {

    _id: string;
    _productId: string;
    _name: string;
    _quantity: number;
    _price: number;

    constructor(productId: string, name: string, quantity: number, price: number) {
        this._id = uuidv4();
        this._productId = productId
        this._name = name;
        this._quantity = quantity;
        this._price = price;
        this.validate();
    }

    validate() {
        if (!this._name) {
            throw new Error('Product name is required');
        }
        if (!this._quantity) {
            throw new Error('Quantity is required');
        }
        if (!this._price) {
            throw new Error('Price is required');
        }
        if (this._quantity < 0) {
            throw new Error('Quantity must be greater than 0');
        }
        if (this._price < 0) {
            throw new Error('Price must be greater than 0');
        }
    }

    toString(): string {
        return `OrderItem: ${this._id}, ${this._name}, ${this._quantity}, ${this._price}`;
    }
}