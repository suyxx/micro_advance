import { Publisher, OrderCancelledEvent, Subjects } from "@myappsack/common-features/build";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}