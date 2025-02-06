import Address from "./Address";
import { v4 as uuidv4 } from 'uuid';

export default class Customer {

    _id: string;
    _name: string;
    _email: string;
    _phone: string;
    _address!: Address;
    _active: boolean = false;
    _rewardPoints: number = 0;

    constructor(name: string, email: string, phone: string) {
        this._id = uuidv4();
        this._name = name;
        this._email = email;
        this._phone = phone;
        this.validate();
    }

    set Address(address: Address) {
        this._address = address;
    }

    validate() {
        if (!this._name) {
            throw new Error('Name is required');
        }
        if (!this._email) {
            throw new Error('Email is required');
        }
    }

    activate() {
        if(!this._address) {
            throw new Error('Address is required to activate customer');
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    getRewardPoints(): number {
        return this._rewardPoints;
    }

}