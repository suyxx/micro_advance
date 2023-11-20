import { Subjects, Publisher, PaymentCreatedEvent } from '@myappsack/common-features';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
