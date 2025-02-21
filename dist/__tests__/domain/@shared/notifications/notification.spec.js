"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = __importDefault(require("../../../../domain/@shared/notifications/notification"));
describe("Notification unit tests", () => {
    it('should create errors', () => {
        const notification = new notification_1.default();
        const error = {
            message: "error message",
            context: "customer"
        };
        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: error message,");
        const error2 = {
            message: "error message 2",
            context: "customer"
        };
        notification.addError(error2);
        expect(notification.messages("customer")).toBe("customer: error message,customer: error message 2,");
        const error3 = {
            message: "error message 3",
            context: "order"
        };
        notification.addError(error3);
        expect(notification.messages()).toBe("customer: error message,customer: error message 2,order: error message 3,");
    });
    it('should check if notification has at least one error', () => {
        const notification = new notification_1.default();
        const error = {
            message: "error message",
            context: "customer"
        };
        notification.addError(error);
        expect(notification.hasErrors()).toBe(true);
    });
    it('should get all errors props', () => {
        const notification = new notification_1.default();
        const error = {
            message: "error message",
            context: "customer"
        };
        notification.addError(error);
        expect(notification.getErrors()).toEqual([error]);
    });
});
