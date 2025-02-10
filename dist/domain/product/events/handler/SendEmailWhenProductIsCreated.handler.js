"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SendToRabbitExample {
    handle(event) {
        const data = JSON.stringify(event.eventData);
        console.log(`Product: ${data}...`);
    }
}
exports.default = SendToRabbitExample;
