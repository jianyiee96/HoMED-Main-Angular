import { Booking } from '../booking/booking';
import { MedicalCentre } from '../medical-centre/medical-center';

export class BookingSlot{
    booking: Booking
    medicalCentre: MedicalCentre
    constructor(booking?: Booking, medicalCentre?: MedicalCentre){
        this.booking = booking
        this.medicalCentre = medicalCentre
    }
}