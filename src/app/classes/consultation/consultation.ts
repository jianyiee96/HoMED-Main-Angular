import { Booking } from '../booking/booking'
import { ConsultationStatusEnum } from '../consultationstatus-enum'
import { MedicalOfficer } from '../employee/employee'

export class Consultation {
  consultationId: number
  booking: Booking
  consultationStatusEnum: ConsultationStatusEnum
  joinQueueDateTime: Date
  startDateTime: Date
  endDateTime: Date
  remarks: string
  remarksForServiceman: string
  medicalOfficer: MedicalOfficer

  constructor(consultationId?: number, booking?: Booking, consultationStatusEnum?: ConsultationStatusEnum, joinQueueDateTime?: Date, startDateTime?: Date,
    endDateTime?: Date, remarks?: string, remarksForServiceman?: string, medicalOfficer?: MedicalOfficer) {
    this.consultationId = consultationId
    this.booking = booking
    this.consultationStatusEnum = consultationStatusEnum
    this.joinQueueDateTime = joinQueueDateTime
    this.startDateTime = startDateTime
    this.endDateTime = endDateTime
    this.remarks = remarks
    this.remarksForServiceman = remarksForServiceman
    this.medicalOfficer = medicalOfficer
  }
}