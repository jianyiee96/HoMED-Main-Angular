import { FormTemplate } from '../formtemplate/formtemplate'

export class ConsultationPurpose {

    consultationPurposeId: number
    consultationPurposeName: string
    formTemplates: FormTemplate[]

    constructor(consultationPurposeId?: number, consultationPurposeName?: string,
        formTemplates?: FormTemplate[] ){
            
        this.consultationPurposeId = consultationPurposeId
        this.consultationPurposeName = consultationPurposeName
        this.formTemplates = formTemplates
    }
}
