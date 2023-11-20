import { Publisher, OrderCreatedEvent, Subjects } from "@myappsack/common-features/build";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}