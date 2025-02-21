import Entity from "../../@shared/entities/entity.abstract";
import NotificationError from "../../@shared/notifications/notification.error";
import Address from "./VOs/Address";
import { v4 as uuidv4 } from 'uuid';

export default class Customer extends Entity {

    _name: string;
    _email: string;
    _phone: string;
    _address!: Address;
    _active: boolean = false;
    _rewardPoints: number = 0;

    constructor(name: string, email: string, phone: string) {
        super();
        this._id = uuidv4();
        this._name = name;
        this._email = email;
        this._phone = phone;
        this.validate();

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    set Address(address: Address) {
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