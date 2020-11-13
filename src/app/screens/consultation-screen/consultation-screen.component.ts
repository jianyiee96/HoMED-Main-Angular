import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Consultation } from 'src/app/classes/consultation/consultation';
import { BreadcrumbService } from 'src/app/services/breadcrum.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
    selector: 'app-consultation-screen',
    templateUrl: './consultation-screen.component.html',
    styleUrls: ['./consultation-screen.component.css'],
    providers: [MessageService]
})

export class ConsultationScreenComponent implements OnInit {
    myConsultations: Consultation[] = []
    selectedConsultation: Consultation
    isSelected: boolean
    queueNumber: number

    constructor(private breadcrumbService: BreadcrumbService, private consultationService: ConsultationService) {
        this.breadcrumbService.setItems([
            { label: 'Manage Consultation' }
        ])
    }

    ngOnInit() {
        this.consultationService.retrieveServicemanConsultations().subscribe(
            response => {
                (async () => {
                    this.myConsultations = response.consultations
                })();
            }, error => {
                console.error(error)
            }
        );
        this.isSelected = false
    }

    formatAddress(streetName: string, unitNumber: string, buildingName: string, country: string, postal: string) {
        let str = streetName
        if (unitNumber !== undefined && unitNumber.trim() !== "") {
          str += ", " + unitNumber;
        }
    
        if (buildingName !== undefined && buildingName.trim() !== "") {
          str += ", " + buildingName;
        }
    
        if (country !== undefined && country.trim() !== "") {
          str += ", " + country;
        }
    
        if (postal !== undefined && postal.trim() !== "") {
          str += " " + postal;
        }
    
        return str;
      }

    onRowSelect(event) {
        this.isSelected = true
        if (this.selectedConsultation.consultationStatusEnum.toString().toUpperCase() === 'WAITING') {
            this.consultationService.retrieveConsultationQueuePosition(this.selectedConsultation.consultationId).subscribe(
                response => {
                    (async () => {
                        this.queueNumber = response.position
                    })();
                }, error => {
                    console.error(error)
                }
                
            )
            this.selectedConsultation.joinQueueDateTime = this.convertUTCStringToSingaporeDate(this.selectedConsultation.joinQueueDateTime)
        } else if (this.selectedConsultation.consultationStatusEnum.toString().toUpperCase() === 'COMPLETED') {
            if (this.selectedConsultation.startDateTime.toString().includes("UTC")) {
                
                this.selectedConsultation.startDateTime = this.convertUTCStringToSingaporeDate(this.selectedConsultation.startDateTime)
                this.selectedConsultation.endDateTime = this.convertUTCStringToSingaporeDate(this.selectedConsultation.endDateTime)
            }
        }
    }

    onRowUnselect(event) {
        this.isSelected = false
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

    calculateQueueNumber(bookingId: number) {
        var mod = bookingId % 1000
        return ("000" + mod).slice(-3)
      }
}