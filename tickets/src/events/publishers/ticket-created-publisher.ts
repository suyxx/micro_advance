import { Publisher, Subjects, TicketCreatedEvent } from '@myappsack/common-features'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject : Subjects.TicketCreated = Subjects.TicketCreated;
    
}

