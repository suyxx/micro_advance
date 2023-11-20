import {
    Listener,
    Subjects,
    ExpirationCompleteEvent,
    OrderStatus,
  } from '@myappsack/common-features';
  import { Message } from 'node-nats-streaming';
  import { queueGroupName } from './queue-group-name';
  import { Order } from '../../models/order';
  import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
  
  export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    queueGroupName = queueGroupName;
    subject: Subjects.ExperationComplete = Subjects.ExperationComplete;
  
    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
      console.log("data order id listener",data.orderId);  
      const order = await Order.findById(data.orderId).populate('ticket');
      console.log("object order id listener",order!.id);  

      if (!order) {
        throw new Error('Order not found');
      }

      if(order.status === OrderStatus.Complete){
        return msg.ack();
      }
  
      order.set({
        status: OrderStatus.Cancelled,
      });
      await order.save();

      await new OrderCancelledPublisher(this.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
          id: order.ticket.id,
        },
      });
  
      msg.ack();
    }
  }
  