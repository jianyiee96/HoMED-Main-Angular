import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ConsultationPurpose } from 'src/app/classes/consultationpurpose/consultationpurpose';
import { BreadcrumbService } from 'src/app/services/breadcrum.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
    selector: 'app-booking-management-screen',
    templateUrl: './booking-management-screen.component.html',
    styleUrls: ['./booking-management-screen.component.css'],
    providers: [MessageService]
})

export class BookingManagementScreenComponent implements OnInit {
    newBookingCreationDisplay: boolean
    consultationPurposes: ConsultationPurpose[]
    msgForDialog: Message[] = []
    selectedConsultationPurpose = ConsultationPurpose

    constructor(private breadcrumbService: BreadcrumbService, private consultationService: ConsultationService){
        this.breadcrumbService.setItems([
            {label: 'Manage Booking'}
        ])
    }

    ngOnInit(){
        this.newBookingCreationDisplay = false
        this.consultationService.retrieveAllConsultationPurposes().subscribe(
            response => {
                (async () => {   
                    this.consultationPurposes = response.consultationPurposes
                    this.msgForDialog = []
                    this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Password changed successfully' })
                  })(); 
                }, error => {
                    this.msgForDialog = []
                    this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(37) })
                  }
        );     
    }

    

    displayNewBoookingCreation(){
        this.newBookingCreationDisplay = true;
    }

    submit(form: NgForm) {
        
    }

}