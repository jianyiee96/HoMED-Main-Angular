import { EmployeeRoleEnum } from '../employeerole-enum'
import { GenderEnum } from '../gender-enum'
import { MedicalCentre } from '../medical-centre/medical-center'
import { Address } from '../serviceman/serviceman'

export class Employee{
    employeeId: number
    name: string
    email: string
    phoneNumber: string
    gender: GenderEnum
    password: string
    address: Address
    isActivated: boolean
    role: EmployeeRoleEnum
    salt: string
    constructor(employeeId?:number, name?: string, email?: string, phoneNumber?: string, gender?: GenderEnum, password?: string,
        address?: Address, isActivated?: boolean, role?: EmployeeRoleEnum, salt?: string){
        
        this.employeeId = employeeId
        this.name = name
        this.email = email
        this.phoneNumber = phoneNumber
        this.gender = gender
        this.password = password
        this.address = address
        this.isActivated = isActivated
        this.role = role
        this.salt = salt
    }

}

export class MedicalStaff extends Employee{
    medicalCenter: MedicalCentre

    constructor(name?: string, password?: string, email?: string, address?: Address, phoneNumber?: string, gender?: GenderEnum){
        super()
        this.name = name
        this.password = password
        this.email = email
        this.address = address
        this.phoneNumber = phoneNumber
        this.gender = gender 
    }
}

export class MedicalOfficer extends MedicalStaff{
    constructor(name?: string, password?: string, email?: string, address?: Address, phoneNumber?: string, gender?: GenderEnum){
        super()
        this.name = name
        this.password = password
        this.email = email
        this.address = address
        this.phoneNumber = phoneNumber
        this.gender = gender 
        this.role = EmployeeRoleEnum.MEDICAL_OFFICER
    }
}

