import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ConditionStatusWrapper } from 'src/app/classes/condition-status/condition-status';
import { MedicalBoardCaseWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';
import { MedicalBoardCaseStatusEnum } from 'src/app/classes/medicalboardcase-enum';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { BreadcrumbService } from 'src/app/services/breadcrum.service';
import { MedicalReviewService } from 'src/app/services/medical-review/medical-review.service';
import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-medical-review-screen',
  templateUrl: './medical-review-screen.component.html',
  styleUrls: ['./medical-review-screen.component.css'],
  providers: [MessageService]
})
export class MedicalReviewScreenComponent implements OnInit {
  medicalBoardCaseWrappers: MedicalBoardCaseWrapper[] = []
  selectedCase: MedicalBoardCaseWrapper
  displayMedicalBoardCaseWrappers: MedicalBoardCaseWrapper[] = []
  upcomingMedicalBoardCaseWrappers: MedicalBoardCaseWrapper[] = []
  completedMedicalBoardCaseWrappers: MedicalBoardCaseWrapper[] = []
  allConditionStatusWrappers: ConditionStatusWrapper[] = []
  activeConditionStatusWrappers: ConditionStatusWrapper[]
  expiredConditionStatusWrappers: ConditionStatusWrapper[]
  currentServiceman: Serviceman
  displayCompleted: boolean
  index: number
  trueboolean: boolean
  
  constructor(private breadcrumbService: BreadcrumbService, private activatedRoute: ActivatedRoute, private medicalReviewService: MedicalReviewService, private servicemanService: ServicemanService,
    private sessionService: SessionService) {
    this.breadcrumbService.setItems([
        { label: 'Medical Review' }
    ])
}

  ngOnInit(): void {
    let tempString = this.activatedRoute.snapshot.paramMap.get('mbId')
    this.servicemanService.retrieveServicemanDetails().subscribe(
      response => {
        this.currentServiceman = response.serviceman
        this.sessionService.setCurrentServiceman(this.currentServiceman)
      },
      error => {
        console.log(error);
      }
    )
    this.medicalReviewService.retrieveAllServicemanMedicalBoardCases().subscribe(
      response => {
        this.medicalBoardCaseWrappers = response.medicalBoardCases
        this.medicalBoardCaseWrappers.forEach(mbCase => {
          console.log(parseInt(tempString))
          if (parseInt(tempString) === mbCase.medicalBoardCase.medicalBoardCaseId) {
            if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString().toUpperCase() == 'COMPLETED') {
              console.log("here")
              this.displayCompleted = true
              console.log(this.displayCompleted)
            }
          }
          mbCase.scheduledStartDate = this.convertUTCStringToSingaporeDate(mbCase.scheduledStartDate)
          mbCase.scheduledEndDate = this.convertUTCStringToSingaporeDate(mbCase.scheduledEndDate)
          if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString().toUpperCase() == 'SCHEDULED' || mbCase.medicalBoardCase.medicalBoardCaseStatus.toString().toUpperCase() == 'WAITING') {
            this.upcomingMedicalBoardCaseWrappers.push(mbCase)
          } else if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString().toUpperCase() == 'COMPLETED'){
            mbCase.conditionStatuses.forEach(conStatWrapper => {
              conStatWrapper.conditionStatus.statusEndDate = this.convertUTCStringToSingaporeDate(conStatWrapper.conditionStatus.statusEndDate)
              conStatWrapper.conditionStartDate = this.convertUTCStringToSingaporeDate(conStatWrapper.conditionStartDate)
            });
            this.completedMedicalBoardCaseWrappers.push(mbCase)
          } 
        
        });
        if (this.displayCompleted) {
          this.index = 1
        } else {
          this.index = 0
        }
        console.log("final")
        console.log(this.displayCompleted)
        this.upcomingMedicalBoardCaseWrappers.sort((x, y) => (y.scheduledStartDate.getTime() - x.scheduledStartDate.getTime()))
        this.completedMedicalBoardCaseWrappers.sort((x, y) => (y.scheduledStartDate.getTime() - x.scheduledStartDate.getTime()))
        this.upcomingMedicalBoardCaseWrappers = this.upcomingMedicalBoardCaseWrappers.slice(0,5)
        this.completedMedicalBoardCaseWrappers = this.completedMedicalBoardCaseWrappers.slice(0,5)
      }
    )
    this.medicalReviewService.retrieveAllServicemanStatuses().subscribe(
      response => {
        this.allConditionStatusWrappers = response.conditionStatuses
        this.activeConditionStatusWrappers = []
        this.expiredConditionStatusWrappers = []

        this.allConditionStatusWrappers.forEach(status => {

          status.conditionStartDate = this.convertUTCStringToSingaporeDate(status.conditionStartDate)

          if (status.conditionStatus.statusEndDate !== undefined) {
            status.conditionStatus.statusEndDate = this.convertUTCStringToSingaporeDate(status.conditionStatus.statusEndDate)

            if (this.checkIsStatusStillActive(status.conditionStatus.statusEndDate.getTime()) && status.conditionStatus.isActive) {
              this.activeConditionStatusWrappers.push(status)
            } else {
              this.expiredConditionStatusWrappers.push(status)
            }

          } else {

            if (status.conditionStatus.isActive) {
              this.activeConditionStatusWrappers.push(status)
            } else {
              this.expiredConditionStatusWrappers.push(status)
            }

          }

        })
      },
      error => {
        console.log(error);
      }
    )
  }

  checkIsStatusStillActive(expiredDate: number) {
    let currentDate = new Date()
    let currentDateInNumbers = currentDate.getTime()

    if (expiredDate < currentDateInNumbers) {
      return true
    }
    return false
  }

  convertUTCStringToSingaporeDate(dateCreated) {
    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+stringUtcTime.substring(5, 7) - 1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))
      ));
    }
  }

  paginate(event){
    this.displayMedicalBoardCaseWrappers = this.medicalBoardCaseWrappers.slice(event.first, event.first + event.rows)
  }

  paginateUpcoming(event){
    this.upcomingMedicalBoardCaseWrappers = this.medicalBoardCaseWrappers.slice(event.first, event.first + event.rows)
  }

  paginateCompleted(event){
    this.completedMedicalBoardCaseWrappers = this.medicalBoardCaseWrappers.slice(event.first, event.first + event.rows)
  }


}
