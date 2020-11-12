import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MedicalBoardCaseWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';
import { MedicalBoardCaseStatusEnum } from 'src/app/classes/medicalboardcase-enum';
import { BreadcrumbService } from 'src/app/services/breadcrum.service';
import { MedicalReviewService } from 'src/app/services/medical-review/medical-review.service';

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
  constructor(private breadcrumbService: BreadcrumbService, private medicalReviewService: MedicalReviewService) {
    this.breadcrumbService.setItems([
        { label: 'Medical Review' }
    ])
}

  ngOnInit(): void {
    this.medicalReviewService.retrieveAllServicemanMedicalBoardCases().subscribe(
      response => {
        this.medicalBoardCaseWrappers = response.medicalBoardCases
        this.medicalBoardCaseWrappers.forEach(mbCase => {
          mbCase.scheduledStartDate = this.convertUTCStringToSingaporeDate(mbCase.scheduledStartDate)
          mbCase.scheduledEndDate = this.convertUTCStringToSingaporeDate(mbCase.scheduledEndDate)
          if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString().toUpperCase() == 'SCHEDULED') {
            this.upcomingMedicalBoardCaseWrappers.push(mbCase)
          } else if (mbCase.medicalBoardCase.medicalBoardCaseStatus.toString().toUpperCase() == 'COMPLETED'){
            this.completedMedicalBoardCaseWrappers.push(mbCase)
          }
        
        });
        this.displayMedicalBoardCaseWrappers = this.medicalBoardCaseWrappers.slice(0,5)
      }
    )
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
