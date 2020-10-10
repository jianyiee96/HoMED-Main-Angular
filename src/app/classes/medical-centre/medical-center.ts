import { Time } from '@angular/common'
import { BookingSlot } from '../booking-slot/booking-slot'
import { DayOfTheWeekEnum } from '../dayoftheweek-enum'
import { MedicalStaff } from '../employee/employee'
import { Address } from '../serviceman/serviceman'

export class MedicalCentre{
    medicalCentreId: number
    name: string
    phone: string
    address: Address
    operatingHours: OperatingHours[]
    medicalStaffList: MedicalStaff[]
    bookingSlots: BookingSlot[]
    constructor(medicalCentreId?: number, name?: string, phone?: string, address?: Address, operatingHours?: OperatingHours[],
        medicalStaffList?: MedicalStaff[], bookingSlots?: BookingSlot[]){
        
        this.medicalCentreId = medicalCentreId
        this.name = name
        this.phone = phone
        this.address = address
        this.operatingHours = operatingHours
        this.medicalStaffList = medicalStaffList
        this.bookingSlots = bookingSlots
    }

}

export class OperatingHours{
    operatingHoursId: number
    dayOfWeek: DayOfTheWeekEnum
    isOpen: boolean
    openingHours: Time
    closingHours: Time
    constructor(operatingHoursId?: number, dayOfWeek?: DayOfTheWeekEnum, isOpen?: boolean, openingHours?: Time, closingHours?: Time){
        this.operatingHoursId = operatingHoursId
        this.dayOfWeek = dayOfWeek
        this.isOpen = isOpen
        this.openingHours = openingHours
        this.closingHours = closingHours
    }
}