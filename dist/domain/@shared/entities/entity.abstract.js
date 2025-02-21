"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = __importDefault(require("../notifications/notification"));
class Entity {
    constructor() {
        this.notification = new notification_1.default();
    }
}
exports.default = Entity;
