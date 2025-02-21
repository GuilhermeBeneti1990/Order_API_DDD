"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_abstract_1 = __importDefault(require("../../@shared/entities/entity.abstract"));
const notification_error_1 = __importDefault(require("../../@shared/notifications/notification.error"));
const uuid_1 = require("uuid");
class Customer extends entity_abstract_1.default {
    constructor(name, email, phone) {
        super();
        this._active = false;
        this._rewardPoints = 0;
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._email = email;
        this._phone = phone;
        this.validate();
        if (this.notification.hasErrors()) {
            throw new notification_error_1.default(this.notification.getErrors());
        }
    }
    set Address(address) {
        this._address = address;
    }
    validate() {
        if (!this._name) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
        }
        if (!this._email) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
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
