import { MedicalBoardSlot } from '../booking-slot/booking-slot'
import { ConditionStatus, ConditionStatusWrapper } from '../condition-status/condition-status'
import { Consultation } from '../consultation/consultation'
import { MedicalBoardCaseStatusEnum } from '../medicalboardcase-enum'
import { MedicalBoardTypeEnum } from '../medicalboardtype-enum'
import { PesStatusEnum } from '../pes-status-enum.enum'

export class MedicalBoardCaseWrapper {

  chairman: String
  conditionStatuses: ConditionStatusWrapper[]
  medicalBoardCase: MedicalBoardCase
  scheduledEndDate: Date
  scheduledStartDate: Date

  constructor(
      chairman?: string,
      conditionStatuses?: ConditionStatusWrapper[],
      medicalBoardCase?: MedicalBoardCase,
      scheduledEndDate?: Date,
      scheduledStartDate?: Date
  ) {

      this.chairman = chairman
      this.conditionStatuses = conditionStatuses
      this.medicalBoardCase = medicalBoardCase
      this.scheduledEndDate = scheduledEndDate
      this.scheduledStartDate = scheduledStartDate

  }
}

export class MedicalBoardCase {

  finalPesStatus: PesStatusEnum
  isSigned: boolean
  medicalBoardCaseId: number
  medicalBoardCaseStatus: MedicalBoardCaseStatusEnum
  medicalBoardType: MedicalBoardTypeEnum

  constructor(
      finalPesStatus?: PesStatusEnum,
      isSigned?: boolean,
      medicalBoardCaseId?: number,
      medicalBoardCaseStatus?: MedicalBoardCaseStatusEnum,
      medicalBoardType?: MedicalBoardTypeEnum
  ) {

      this.finalPesStatus = finalPesStatus
      this.isSigned = isSigned
      this.medicalBoardCaseId = medicalBoardCaseId
      this.medicalBoardCaseStatus = medicalBoardCaseStatus
      this.medicalBoardType = medicalBoardType

  }

}
