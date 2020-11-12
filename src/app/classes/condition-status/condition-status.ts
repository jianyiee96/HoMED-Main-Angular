import { MedicalBoardCase } from '../medical-board-case-wrapper/medical-board-case-wrapper'
import { Serviceman } from '../serviceman/serviceman'

export class ConditionStatusWrapper {

  conditionStartDate: Date
  conditionStatus: ConditionStatus
  medicalBoardCaseId: number

  constructor(conditionStartDate?: Date, conditionStatus?: ConditionStatus, medicalBoardCaseId?: number) {

      this.conditionStartDate = conditionStartDate
      this.conditionStatus = conditionStatus
      this.medicalBoardCaseId = medicalBoardCaseId

  }

}

export class ConditionStatus {

  conditionStatusId: number
  description: string
  isActive: boolean
  statusEndDate: Date

  constructor(conditionStatusId?: number, description?: string, isActive?: boolean, statusEndDate?: Date) {

      this.conditionStatusId = conditionStatusId
      this.description = description
      this.isActive = isActive
      this.statusEndDate = statusEndDate

  }

}
