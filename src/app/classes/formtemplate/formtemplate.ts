import { FormTemplateStatusEnum } from '../formtemplatestatus-enum'
import { FormInstance } from '../forminstance/forminstance'
import { FormField } from '../formfield/formfield'
import { ConsultationPurposes } from '../consultationpurpose/consultationpurpose'

export class FormTemplate {

    formTemplateId: number
    formTemplateName: string
    dateCreated: Date
    datePublished: Date
    formStatus: FormTemplateStatusEnum
    isPublic: Boolean
    formFields: FormField[]
    consultationPurposes: ConsultationPurposes[]
    formInstances: FormInstance[]

    constructor(formTemplateId?: number, formTemplateName?: string, dateCreated?: Date, 
            datePublished?: Date, formStatus?: FormTemplateStatusEnum, isPublic?: Boolean, 
            formFields?: FormField[], consultationPurposes?: ConsultationPurposes[], 
            formInstances?: FormInstance[]) {

        this.formTemplateId = formTemplateId
        this.formTemplateName = formTemplateName
        this.dateCreated = dateCreated
        this.datePublished = datePublished
        this.formStatus = formStatus
        this.isPublic = isPublic
        this.formFields = formFields
        this.consultationPurposes = consultationPurposes
        this.formInstances = formInstances
    }

}

