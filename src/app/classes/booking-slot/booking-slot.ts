import { Booking } from '../booking/booking';
import { MedicalCentre } from '../medical-centre/medical-center';

export abstract class Slot {
    slotId: number
    startDateTime: Date
    endDateTime: Date
}

export class BookingSlot extends Slot{
    booking: Booking
    medicalCentre: MedicalCentre
    constructor(booking?: Booking, medicalCentre?: MedicalCentre){
        super()
        this.booking = booking
        this.medicalCentre = medicalCentre
    }
}