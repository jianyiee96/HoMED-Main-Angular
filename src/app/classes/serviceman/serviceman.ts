import { BloodTypeEnum } from '../bloodtype-enum'
import { GenderEnum } from '../gender-enum'

export class Serviceman {

    servicemanId: number
    name: string
    email: string
    phoneNumber: string
    rod: Date
    gender: GenderEnum
    bloodType: BloodTypeEnum
    password: string
    address: string
    isActivated: boolean

    constructor(servicemanId?: number, name?: string, email?: string , phoneNumber?: string, rod?: Date, gender?: GenderEnum, bloodType?: BloodTypeEnum, password?: string, address?: string, isActivated?: boolean) {
        this.servicemanId = servicemanId
        this.name = name
        this.email = email
        this.phoneNumber = phoneNumber
        this.rod = rod
        this.gender = gender
        this.bloodType = bloodType
        this.password = password
        this.address = address
        this.isActivated = isActivated
    }

}