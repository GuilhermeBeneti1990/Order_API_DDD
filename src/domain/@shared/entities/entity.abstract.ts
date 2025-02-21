import Notification from "../notifications/notification";

export default abstract class Entity {

    _id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }
    
}