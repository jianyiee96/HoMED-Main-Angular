import { Booking } from '../booking/booking'

export class Consultation{
    consultationId: number
    booking: Booking

    constructor(consultationId?: number, booking?: Booking) {
        this.consultationId = consultationId
        this.booking = booking
    }
}