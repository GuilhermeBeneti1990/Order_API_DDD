"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Notification {
    constructor() {
        this.errors = [];
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    addError(error) {
        this.errors.push(error);
    }
    getErrors() {
        return this.errors;
    }
    messages(context) {
        let message = "";
        this.errors.forEach(error => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }
}
exports.default = Notification;
