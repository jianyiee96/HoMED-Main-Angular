import { BloodTypeEnum } from '../bloodtype-enum'
import { GenderEnum } from '../gender-enum'
import { ServicemanRoleEnum } from '../servicemanrole-enum'


export class Serviceman {

    servicemanId: number
    name: string
    email: string
    phoneNumber: string
    rod: Date
    gender: GenderEnum
    bloodType: BloodTypeEnum
    password: string
    address: Address
    isActivated: boolean
    role : ServicemanRoleEnum
    token : string

    constructor(servicemanId?: number, name?: string, email?: string , phoneNumber?: string, rod?: Date, 
            gender?: GenderEnum, bloodType?: BloodTypeEnum, password?: string, address?: Address, isActivated?: boolean, role?: ServicemanRoleEnum, 
            token?: string) {

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
        this.role = role
        this.token = token
    }

}

export class Address {

    streetName: string
    unitNumber: string
    buildingName: string
    country: string
    postal: string

    constructor(
        streetName?: string,
        unitNumber?: string,
        buildingName?: string,
        country?: string,
        postal?: string) {

        this.streetName = streetName
        this.unitNumber = unitNumber
        this.buildingName = buildingName
        this.country = country
        this.postal = postal

    }

}