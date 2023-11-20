import { Publisher, Subjects, TicketUpdatedEvent } from '@myappsack/common-features'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject : Subjects.TicketUpdated = Subjects.TicketUpdated;
    
}

