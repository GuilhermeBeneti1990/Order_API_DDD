import IEventHandler from "../../../@shared/events/event.handler.interface";
import ProductCreatedEvent from "../productCreated.event";

export default class SendToRabbitExample implements IEventHandler<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        const data = JSON.stringify(event.eventData)
        console.log(`Product: ${data}...`)
    }
}