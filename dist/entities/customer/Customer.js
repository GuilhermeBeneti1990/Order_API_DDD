"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Customer {
    constructor(name, email, phone) {
        this._active = false;
        this._rewardPoints = 0;
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._email = email;
        this._phone = phone;
        this.validate();
    }
    set Address(address) {
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
        if (!this._address) {
            throw new Error('Address is required to activate customer');
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    addRewardPoints(points) {
        this._rewardPoints += points;
    }
    getRewardPoints() {
        return this._rewardPoints;
    }
}
exports.default = Customer;
