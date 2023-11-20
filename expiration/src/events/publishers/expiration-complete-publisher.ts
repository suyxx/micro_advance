import { Subjects, Publisher, ExpirationCompleteEvent } from "@myappsack/common-features/build";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExperationComplete = Subjects.ExperationComplete
}