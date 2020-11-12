import { Booking } from '../booking/booking';
import { MedicalBoardSlotStatusEnum } from '../medical-board-slot-status-enum.enum';
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

export class MedicalBoardSlot extends Slot {
    medicalBoardSlotStatusEnum: MedicalBoardSlotStatusEnum
    estimatedTimeForEachBoardInPresenceCase: number
    estimatedTimeForEachBoardInAbsenceCase: number
    medicalOfficerOneKey: string
    medicalOfficerTwoKey: string
    constructor(medicalBoardSlotStatusEnum?: MedicalBoardSlotStatusEnum, estimatedTimeForEachBoardInPresenceCase?: number,
        estimatedTimeForEachBoardInAbsenceCase?: number, medicalOfficerOneKey?: string, medicalOfficerTwoKey?: string) {
        super();
        this.medicalBoardSlotStatusEnum = medicalBoardSlotStatusEnum
        this.estimatedTimeForEachBoardInAbsenceCase = estimatedTimeForEachBoardInAbsenceCase
        this.estimatedTimeForEachBoardInPresenceCase = estimatedTimeForEachBoardInPresenceCase
        this.medicalOfficerOneKey = medicalOfficerOneKey
        this.medicalOfficerTwoKey = medicalOfficerTwoKey
    }
}