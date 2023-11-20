import { Listener, OrderStatus, Subjects } from "@myappsack/common-features/build";
import { OrderCreatedEvent } from "@myappsack/common-features/build";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = queueGroupName

    async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

        await expirationQueue.add({
            orderId: data.id,
        }, {
            delay,
        });
        msg.ack();
    }

}