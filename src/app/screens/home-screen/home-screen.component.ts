import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/classes/booking/booking';
import { FormInstance } from 'src/app/classes/forminstance/forminstance';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  upcomingBookings: Booking[] = []
  unsubmittedForms: FormInstance[] = []
  faCoffee = faCoffee

  constructor(private breadcrumbService: BreadcrumbService, private schedulerService: SchedulerService) {
    this.breadcrumbService.setItems([
        {label: ''}
    ]); 
  }

  ngOnInit(): void {
    this.schedulerService.retrieveAllServicemanBookings().subscribe(
      response => {
        (async () => {
          let tempBookings = response.bookings
          for (let a of tempBookings) {
            if(a.bookingStatusEnum.toString().toUpperCase() === 'UPCOMING') {
              a.bookingSlot.endDateTime = this.convertUTCStringToSingaporeDate(a.bookingSlot.endDateTime)
              a.bookingSlot.startDateTime = this.convertUTCStringToSingaporeDate(a.bookingSlot.startDateTime)
              this.upcomingBookings.push(a)
            }
          }
          for (let a of this.upcomingBookings) {
            for (let b of a.formInstances) {
              if (b.formInstanceStatusEnum.toString().toUpperCase() === 'DRAFT') {
                this.unsubmittedForms.push(b)
              }
            }
          }
        })();
      }, error => {
        console.error(error)
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
