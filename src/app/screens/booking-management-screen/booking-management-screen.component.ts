import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { delay } from 'rxjs/operators';
import { BookingSlot } from 'src/app/classes/booking-slot/booking-slot';
import { Booking } from 'src/app/classes/booking/booking';
import { ConsultationPurpose } from 'src/app/classes/consultationpurpose/consultationpurpose';
import { MedicalCentre } from 'src/app/classes/medical-centre/medical-center';
import { BreadcrumbService } from 'src/app/services/breadcrum.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { MedicalCentreService } from 'src/app/services/medical-center/medical-center.service';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-booking-management-screen',
  templateUrl: './booking-management-screen.component.html',
  styleUrls: ['./booking-management-screen.component.css'],
  providers: [MessageService]
})

export class BookingManagementScreenComponent implements OnInit {
  myBookings: Booking[] = []
  newBookingCreationDisplay: boolean
  consultationPurposes: ConsultationPurpose[] = []
  medicalCentres: MedicalCentre[] = []
  msgForDialog: Message[] = []
  selectedConsultationPurpose: ConsultationPurpose
  selectedMedicalCentre: MedicalCentre
  selectedDate: Date
  selectedSlot: BookingSlot
  dateRetrieved: boolean
  availableSlots: BookingSlot[] = []
  displayDetails: boolean
  selectedBooking: Booking
  passedBookingId: number
  unsubmittedFormMessages: Message[] = [];
  createdBookingId: number
  bookingComment: string
  cancellationComment: string
  displayCancelDialog: boolean

  constructor(private breadcrumbService: BreadcrumbService, private consultationService: ConsultationService,
    private medicalCentreService: MedicalCentreService, private schedulerService: SchedulerService,
    private sessionService: SessionService, private confirmationService: ConfirmationService, private datepipe: DatePipe,
    private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
    this.breadcrumbService.setItems([
      { label: 'Manage Booking' }
    ])
  }

  ngOnInit() {
    let tempString = this.activatedRoute.snapshot.paramMap.get('slotId')
    this.displayCancelDialog = false
    this.newBookingCreationDisplay = false
    this.dateRetrieved = false
    this.displayDetails = false
    this.consultationService.retrieveAllConsultationPurposes().subscribe(
      response => {
        (async () => {
          this.consultationPurposes = response.consultationPurposes
        })();
      }, error => {
        console.error(error)
      }
    );
    this.medicalCentreService.retrieveAllMedicalCentres().subscribe(
      response => {
        (async () => {
          this.medicalCentres = response.medicalCentres
        })();
      }, error => {
        console.error(error)
      }
    );
    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {
        (async () => {
          this.myBookings = response.bookings
          // this.myBookings.sort((x,y) => (x.bookingStatusEnum.toString() > y.bookingStatusEnum.toString()) ? 1 : ((x.bookingStatusEnum.toString() > y.bookingStatusEnum.toString()) ? -1 : 0))
          
          for (let a of this.myBookings) {
            a.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(a.bookingSlot.endDateTime)
            a.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(a.bookingSlot.startDateTime)
          }
          if (tempString !== null) {
            this.passedBookingId = parseInt(tempString)
            for (var index = 0; index < this.myBookings.length; index++) {
              if (this.myBookings[index].bookingId === this.passedBookingId) {
                this.selectedBooking = this.myBookings[index];
                this.displayDetails = true
                break;
              }
            }
          }
          else {
            this.displayDetails = false
          }
        })();
      }, error => {
        console.error(error)
      }
    )
  }

  onRowSelect(event) {
    this.unsubmittedFormMessages = []
    this.displayDetails = true
    this.newBookingCreationDisplay = false;
    for (let form of this.selectedBooking.formInstances) {
      if (form.formInstanceStatusEnum.toString().toUpperCase() === "DRAFT") {
        this.unsubmittedFormMessages.push({ severity: 'warn', summary: 'Warning', detail: form.formTemplateMapping.formTemplateName + " is not submitted yet!" });
      }
    }


  }

  onRowUnselect(event) {
    this.displayDetails = false
  }

  // viewBookingDetails(){
  //     this.displayDetails = true
  //     this.selectedBooking = 

  // }
  checkParamsFilled() {
    return this.selectedMedicalCentre == null || this.selectedConsultationPurpose == null || this.selectedDate == null;
  }

  async createBooking() {
    return new Promise((resolve, reject) => {
      this.schedulerService.scheduleBooking(this.sessionService.getCurrentServiceman().servicemanId,
      this.selectedConsultationPurpose.consultationPurposeId, this.selectedSlot.slotId, this.bookingComment).subscribe(
        async response => {

          this.createdBookingId = response.bookingId
          this.msgForDialog = []
          this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Booking Created Successfully' })
          this.newBookingCreationDisplay = false
          console.log(this.createdBookingId)
          this.router.navigate(['/booking-management-screen/' + this.createdBookingId])
        },
        error => {
          this.msgForDialog = []
          this.msgForDialog.push({ severity: 'success', summary: '', detail: error.substring(32) })
        }
      );
    });
    
  }

  cancelBooking() {
    this.schedulerService.cancelBooking(this.selectedBooking.bookingId, this.cancellationComment).subscribe(
      response => {
        (async () => {
          this.msgForDialog = []
          this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Booking Cancelled Successfully' })
          this.newBookingCreationDisplay = false
        })
        this.ngOnInit()
      },
      error => {
        console.log("HJEHEHE")
        this.messageService.add({severity:'error', summary: 'Error', detail: error.substring(32)});
        console.log("HEHEHEHEE")
        // this.msgForDialog.push({ severity: 'success', summary: '', detail: error.substring(32) })
      }
    );

  }

  confirmCancel() {
    this.displayCancelDialog = true
    // this.confirmationService.confirm({
    //   header: 'Confirm Booking?',
    //   icon: 'pi pi-exclamation-triangle',
    //   message: "Are you sure you would like to cancel the booking?",
    //   acceptLabel: 'Yes',
    //   rejectLabel: 'No',
    //   accept: async () => {
    //     this.cancelBooking()
        
    //   },
    //   reject: () => {
    //   }
    // });
  }

  confirmCreateMessage() {
    let date = this.datepipe.transform(this.selectedDate, 'yyyy/MM/dd')
    let time1 = this.datepipe.transform(this.selectedSlot.startDateTime, 'HH:mm')
    let time2 = this.datepipe.transform(this.selectedSlot.endDateTime, 'HH:mm')
    return "Do you want to confirm your booking on " + date + " (" + time1 + " - " + time2 + ") at " + this.selectedMedicalCentre.name
  }

  confirmCreate() {
    this.confirmationService.confirm({
      header: 'Confirm Booking?',
      icon: 'pi pi-exclamation-triangle',
      message: this.confirmCreateMessage(),
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: async () => {
        this.createBooking()
        console.log(this.createdBookingId)
        
        
        
        console.log(this.createdBookingId)
        
        
      },
      reject: () => {
      }
    });
  }

  

  displayAvailableSlots() {
    console.log("called")
    this.selectedSlot = null
    this.availableSlots = []
    if (this.selectedMedicalCentre != null && this.selectedConsultationPurpose != null && this.selectedDate != null) {
      console.log("if called")
      var formattedDate = new Date(this.selectedDate)
      this.schedulerService.queryBookingSlots(this.selectedMedicalCentre.medicalCentreId, formattedDate).subscribe(
        response => {
          (async () => {
            let tempAvailableSlots = response.bookingSlots;
            tempAvailableSlots.forEach(ts => {
              const currDate = new Date()
              const recvDate = this.convertUTCStringToSingaporeDate(ts.startDateTime)
              console.log("here1")
              console.log(ts)
              if (recvDate > currDate) {
                if (ts.booking == null) {
                  console.log("here2")
                  console.log(ts)
                  ts.startDateTime = this.convertUTCStringToSingaporeDate(ts.startDateTime)
                  ts.endDateTime = this.convertUTCStringToSingaporeDate(ts.endDateTime)
                  this.availableSlots.push(ts)
                }
              }
            })
            this.dateRetrieved = true
          })();
        }, error => {
          this.msgForDialog = []
          this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(37) })
        }
      )
    }
  }
  // retrieveAvailableSlots() {
  //     var formattedDate = new Date(this.selectedDate)
  //     this.schedulerService.queryBookingSlots(this.selectedMedicalCentre.medicalCentreId, formattedDate).subscribe(
  //         response => {
  //             (async () => {
  //                 this.availableSlots = response.bookingSlots;
  //                 let currDate = new Date();
  //                 for(let a of this.availableSlots) {
  //                     if(a.startDateTime < currDate) {
  //                         this.availableSlots.splice(this.availableSlots.indexOf(a), 1)
  //                     }
  //                     a.startDateTime = this.convertUTCStringToSingaporeDate(a.startDateTime)
  //                     a.endDateTime = this.convertUTCStringToSingaporeDate(a.endDateTime)
  //                 }
  //                 this.dateRetrieved = true

  //             })();
  //         }, error => {
  //             this.msgForDialog = []
  //             this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(37) })
  //         }
  //     )

  // }

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

  displayNewBoookingCreation() {
    this.newBookingCreationDisplay = true;
    this.displayDetails = false;
  }


  submit(form: NgForm) {

  }

}