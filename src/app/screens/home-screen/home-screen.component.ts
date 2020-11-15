import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/classes/booking/booking';
import { FormInstance } from 'src/app/classes/forminstance/forminstance';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


import { BreadcrumbService } from '../../services/breadcrum.service';
import { MedicalBoardCaseWrapper } from 'src/app/classes/medical-board-case-wrapper/medical-board-case-wrapper';
import { MedicalReviewService } from 'src/app/services/medical-review/medical-review.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  myBookings: Booking[]
  upcomingBookings: Booking[] = []
  unsubmittedForms: FormInstance[] = []
  sortOrder: number;
  nextBooking: Booking
  sortField: string;
  mostRecentBookingDate: Date
  upcomingMedicalBoard: MedicalBoardCaseWrapper

  constructor(private breadcrumbService: BreadcrumbService, private schedulerService: SchedulerService, private medicalBoardService: MedicalReviewService) {
    this.breadcrumbService.setItems([
      { label: '' }
    ]);
  }

  ngOnInit(): void {
    this.sortOrder = 1
    this.sortField = ""
    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {

        this.myBookings = response.bookings
        for (let a of this.myBookings) {
          if (a.bookingStatusEnum.toString().toUpperCase() === 'UPCOMING') {
            a.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(a.bookingSlot.endDateTime)
            a.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(a.bookingSlot.startDateTime)
            this.upcomingBookings.push(a)
            
            if (this.mostRecentBookingDate === undefined) {
              this.mostRecentBookingDate = a.bookingSlot.startDateTime
              this.nextBooking = a
            } else if (this.mostRecentBookingDate > a.bookingSlot.startDateTime) {
              this.mostRecentBookingDate = a.bookingSlot.startDateTime
              this.nextBooking = a
            }
          }
        }
        for (let a of this.upcomingBookings) {
          for (let b of a.formInstances) {
            if (b.formInstanceStatusEnum.toString().toUpperCase() === 'DRAFT') {
              b.booking = a
              this.unsubmittedForms.push(b)
            }
          }
        }

      }, error => {
        console.error(error)
      }
    )

    this.medicalBoardService.retrieveAllServicemanMedicalBoardCases().subscribe(
      response => {
        var medicalBoardCaseWrappers: MedicalBoardCaseWrapper[] = response.medicalBoardCases

        for (var idx = 0; idx < medicalBoardCaseWrappers.length; idx++) {
          if (medicalBoardCaseWrappers[idx].medicalBoardCase.medicalBoardCaseStatus.toString() === "SCHEDULED") {
            this.upcomingMedicalBoard = medicalBoardCaseWrappers[idx]
            this.upcomingMedicalBoard.scheduledStartDate = this.convertUTCStringToSingaporeDate(this.upcomingMedicalBoard.scheduledStartDate)
            this.upcomingMedicalBoard.scheduledEndDate = this.convertUTCStringToSingaporeDate(this.upcomingMedicalBoard.scheduledEndDate)
            console.log(this.upcomingMedicalBoard);
            break
          }
        }
      },
      error => {
        console.log(error);
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


}
