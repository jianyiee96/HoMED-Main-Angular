import { FormInstanceStatusEnum } from '../forminstancestatus-enum'
import { FormTemplate } from '../formtemplate/formtemplate'
import { Serviceman } from '../serviceman/serviceman'
import { FormField } from '../formfield/formfield'
import { Booking } from '../booking/booking'

export class FormInstance {

    formInstanceId: number
    dateCreated: Date
    dateSubmitted: Date
    formInstanceStatusEnum: FormInstanceStatusEnum
    formTemplateMapping: FormTemplate
    formInstanceFields: FormInstanceField[]
    serviceman: Serviceman
    booking: Booking

    constructor(formInstanceId?: number, dateCreated?: Date, dateSubmitted?: Date, formInstanceStatusEnum?: FormInstanceStatusEnum,
        formTemplateMapping?: FormTemplate, formInstanceFields?: FormInstanceField[], 
        serviceman?: Serviceman, booking?: Booking) {
        this.booking = booking
        this.formInstanceId = formInstanceId
        this.dateCreated = dateCreated
        this.dateSubmitted = dateSubmitted
        this.formInstanceStatusEnum = formInstanceStatusEnum
        this.formTemplateMapping = formTemplateMapping
        this.formInstanceFields = formInstanceFields
        this.serviceman = serviceman
    }
}

export class FormInstanceField {

    formInstanceFieldId: number
    formInstanceFieldValues: FormInstanceFieldValue[]
    formFieldMapping: FormField


    constructor(formInstanceFieldId?: number, formInstanceFieldValues?: FormInstanceFieldValue[],
        formFieldMapping?: FormField) {

            this.formInstanceFieldId = formInstanceFieldId
            this.formInstanceFieldValues = formInstanceFieldValues
            this.formFieldMapping = formFieldMapping
    }

}

export class FormInstanceFieldValue {

    formInstanceFieldValueId: number
    inputValue: string

    constructor(formInstanceFieldValueId?: number, inputValue?: string) {

        this.formInstanceFieldValueId = formInstanceFieldValueId
        this.inputValue = inputValue
    }

}
