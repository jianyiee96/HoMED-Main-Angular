import { InputTypeEnum } from '../inputtype-enum'

export class FormField {

    formFieldId: number
    question: string
    position: number
    inputType: InputTypeEnum
    isRequired: boolean
    isServicemanEditable: boolean
    formFieldOptions: FormFieldOption[]


    constructor(formFieldId?: number, question?: string, position?: number, 
        inputType?: InputTypeEnum, isRequired?: boolean, isServicemanEditable?: boolean, 
        formFieldOptions?: FormFieldOption[]) {

        this.formFieldId = formFieldId
        this.question = question
        this.position = position
        this.inputType = inputType
        this.isRequired = isRequired
        this.isServicemanEditable = isServicemanEditable
        this.formFieldOptions = formFieldOptions

    }
}

export class FormFieldOption {

    formFieldOptionId: number
    formFieldOptionValue: string

    constructor(formFieldOptionId?: number, formFieldOptionValue?: string) {

        this.formFieldOptionId = formFieldOptionId
        this.formFieldOptionValue = formFieldOptionValue
    }

}
