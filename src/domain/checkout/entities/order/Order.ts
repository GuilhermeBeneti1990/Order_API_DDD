import OrderItem from "./OrderItem";
import { v4 as uuidv4 } from 'uuid';

export default class Order {

    _id: string;
    _customerId: string;
    _items: OrderItem[];
    _total: number;

    constructor(customerId: string, items: OrderItem[]) {
        this._id = uuidv4();
        this._customerId = customerId;
        this._items = items;
        this._total = this.calculateTotal();
        this.validate();
    }

    validate() {
        if (!this._customerId) {
            throw new Error('Customer id is required');
        }
        if(!this._items || !this._items.length) {
            throw new Error('Order items are required');
        }
    }

    calculateTotal(): number {
        return this._items.reduce((total, item) => total + item._price * item._quantity, 0);
    }
}