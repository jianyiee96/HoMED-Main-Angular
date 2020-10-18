import { BookingSlot } from '../booking-slot/booking-slot'
import { BookingStatusEnum } from '../bookingstatus-enum'
import { Consultation } from '../consultation/consultation'
import { ConsultationPurpose } from '../consultationpurpose/consultationpurpose'
import { FormInstance } from '../forminstance/forminstance'
import { Serviceman } from '../serviceman/serviceman'

export class Booking{
    bookingId: number
    serviceman: Serviceman
    consultationPurpose: ConsultationPurpose
    consultation: Consultation
    bookingSlot: BookingSlot
    formInstances: FormInstance[]
    bookingStatusEnum: BookingStatusEnum

    constructor(bookingId?: number, serviceman?: Serviceman, consultationPurpose?: ConsultationPurpose,
        consultation?: Consultation, bookingSlot?: BookingSlot, formInstances?: FormInstance[], bookingStatusEnum?: BookingStatusEnum) {
            this.bookingId = bookingId
            this.serviceman = serviceman
            this.consultationPurpose = consultationPurpose
            this.consultation = consultation
            this.bookingSlot = bookingSlot
            this.formInstances = formInstances
    }
}