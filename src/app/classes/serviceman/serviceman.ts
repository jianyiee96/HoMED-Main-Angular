import { BloodTypeEnum } from '../bloodtype-enum'
import { GenderEnum } from '../gender-enum'

export class Serviceman {
    
    servicemanId: number
    name: string
    nric: string
    ord: Date
    gender: GenderEnum
    bloodType: BloodTypeEnum
    password: string
    email: string
    address: string

    constructor(servicemanId?: number, name?: string, nric?: string, ord?: Date, gender?: GenderEnum, bloodType?: BloodTypeEnum, password?: string, email?: string, address?: string) {
        this.servicemanId = servicemanId
        this.name = name
        this.nric = nric
        this.ord = ord
        this.gender = gender
        this.bloodType = bloodType
        this.password = password
        this.email = address
    }
}
