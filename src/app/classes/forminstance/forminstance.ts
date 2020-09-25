import { FormInstanceStatusEnum } from '../forminstancestatus-enum'
import { FormTemplate } from '../formtemplate/formtemplate'
import { Serviceman } from '../serviceman/serviceman'
import { FormField } from '../formfield/formfield'

export class FormInstance {

    formInstanceId: number
    formInstanceStatusEnum: FormInstanceStatusEnum
    formTemplateMapping: FormTemplate
    formInstanceFields: FormInstanceField[]
    serviceman: Serviceman

    constructor(formInstanceId?: number, formInstanceStatusEnum?: FormInstanceStatusEnum,
        formTemplateMapping?: FormTemplate, formInstanceFields?: FormInstanceField[], 
        serviceman?: Serviceman) {

        this.formInstanceId = formInstanceId
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
