import { MedicalBoardSlot } from '../booking-slot/booking-slot'
import { ConditionStatus } from '../condition-status/condition-status'
import { Consultation } from '../consultation/consultation'
import { MedicalBoardCaseStatusEnum } from '../medicalboardcase-enum'
import { MedicalBoardTypeEnum } from '../medicalboardtype-enum'
import { PesStatusEnum } from '../pes-status-enum.enum'

export class MedicalBoardCaseWrapper {
  medicalBoardCase: MedicalBoardCase
  scheduledStartDate: Date
  scheduledEndDate: Date
  chairman: string
  conditionStatuses: ConditionStatus[]

  constructor(medicalBoardCase?: MedicalBoardCase, scheduledStartDate?: Date, scheduledEndDate?: Date,
    chairman?: string, conditionStatuses?: ConditionStatus[]) {
      this.medicalBoardCase = medicalBoardCase
      this.scheduledStartDate = scheduledStartDate
      this.scheduledEndDate = scheduledEndDate
      this.conditionStatuses = conditionStatuses
      this.chairman = chairman
    }
}

export class MedicalBoardCase {
  medicalBoardCaseId: number
  medicalBoardType: MedicalBoardTypeEnum
  medicalBoardCaseStatus: MedicalBoardCaseStatusEnum
  consultation: Consultation
  statementOfCase: string
  boardFindings: string
  medicalBoardSlot: MedicalBoardSlot
  previousMedicalBoardCase: MedicalBoardCase
  followUpMedicalBoardCase: MedicalBoardCase
  isSigned: boolean
  finalPesStatus: PesStatusEnum
  conditionStatuses: ConditionStatus[]

  constructor(medicalBoardCaseId?: number, medicalBoardType?: MedicalBoardTypeEnum, medicalBoardCaseStatus?: MedicalBoardCaseStatusEnum
    ,consultation?: Consultation, statementOfCase?: string, boardFindings?: string,
    medicalBoardSlot?: MedicalBoardSlot, previousMedicalBoardCase?: MedicalBoardCase, followUpMedicalBoardCase?: MedicalBoardCase
    ,isSigned?: boolean, finalPesStatus?: PesStatusEnum, conditionStatuses?: ConditionStatus[]) {
    this.medicalBoardCaseId = medicalBoardCaseId
    this.medicalBoardType = medicalBoardType
    this.medicalBoardCaseStatus = medicalBoardCaseStatus
    this.consultation = consultation
    this.statementOfCase = statementOfCase
    this.boardFindings = boardFindings
    this.medicalBoardSlot = medicalBoardSlot
    this.previousMedicalBoardCase = previousMedicalBoardCase
    this.followUpMedicalBoardCase = followUpMedicalBoardCase
    this.isSigned = isSigned
    this.finalPesStatus = finalPesStatus
    this.conditionStatuses = conditionStatuses
    
  }
}