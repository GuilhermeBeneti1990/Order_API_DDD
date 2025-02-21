"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationError extends Error {
    constructor(errors) {
        super(errors.map(error => `${error.context}: ${error.message}`).join(","));
        this.errors = errors;
    }
}
exports.default = NotificationError;
