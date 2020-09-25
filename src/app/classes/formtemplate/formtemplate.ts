import { FormTemplateStatusEnum } from '../formtemplatestatus-enum'
import { FormInstance } from '../forminstance/forminstance'
import { FormField } from '../formfield/formfield'
import { ConsultationPurpose } from '../consultationpurpose/consultationpurpose'

export class FormTemplate {

    formTemplateId: number
    formTemplateName: string
    dateCreated: Date
    datePublished: Date
    formTemplateStatus: FormTemplateStatusEnum
    isPublic: Boolean
    formFields: FormField[]


    constructor(formTemplateId?: number, formTemplateName?: string, dateCreated?: Date, 
            datePublished?: Date, formTemplateStatus?: FormTemplateStatusEnum, isPublic?: Boolean, 
            formFields?: FormField[]) {

        this.formTemplateId = formTemplateId
        this.formTemplateName = formTemplateName
        this.dateCreated = dateCreated
        this.datePublished = datePublished
        this.formTemplateStatus = formTemplateStatus
        this.isPublic = isPublic
        this.formFields = formFields

    }

}

