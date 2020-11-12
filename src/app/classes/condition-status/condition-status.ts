import { timingSafeEqual } from 'crypto'
import { MedicalBoardCase } from '../medical-board-case-wrapper/medical-board-case-wrapper'
import { Serviceman } from '../serviceman/serviceman'

export class ConditionStatus {
  conditionStatusId: number
  serviceman: Serviceman
  medicalBoardCase: MedicalBoardCase
  description: string
  statusEndDate: Date
  isActive: boolean

  constructor(conditionStatusId?: number, serviceman?: Serviceman, medicalBoardCase?: MedicalBoardCase, description?: string,
    statusEndDate?: Date, isActive?: boolean) {
      this.conditionStatusId = conditionStatusId
      this.serviceman = serviceman
      this.medicalBoardCase = medicalBoardCase
      this.description = description
      this.statusEndDate = statusEndDate
      this.isActive = isActive
    }
}
