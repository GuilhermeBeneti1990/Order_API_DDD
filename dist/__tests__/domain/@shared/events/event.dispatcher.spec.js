"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatcher_1 = __importDefault(require("../../../../domain/@shared/events/event.dispatcher"));
const SendEmailWhenProductIsCreated_handler_1 = __importDefault(require("../../../../domain/product/events/handler/SendEmailWhenProductIsCreated.handler"));
const productCreated_event_1 = __importDefault(require("../../../../domain/product/events/productCreated.event"));
describe('Domain events tests', () => {
    it('Should register an event handler', () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreated_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
    it('Should unregister an event handler', () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreated_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });
    it('Should unregister all event handlers', () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreated_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBe(undefined);
    });
    it('Should notify an event handler', () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreated_handler_1.default();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        const productCreatedEvent = new productCreated_event_1.default({
            name: "Product 1",
            price: 10.0
        });
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
