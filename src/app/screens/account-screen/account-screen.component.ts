import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';

import {BreadcrumbService} from '../../services/breadcrum.service';
import { GenderEnum } from 'src/app/classes/gender-enum';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.component.html',
  styleUrls: ['./account-screen.component.css'],
  providers: [MessageService]
})
export class AccountScreenComponent implements OnInit {

  model: any = {};

  serviceman: Serviceman
  name: string
  password: string
  gender: GenderEnum
  phoneNumber: string
  rod: Date
  email: string
  streetName: string
  unitNumber: string
  buildingName: string
  postal: string
  newPassword: string
  confirmNewPassword: string
  msgForDialog: Message[] = []
  displayModal: boolean

  editFields: boolean
  fieldsUpdated: boolean

  phoneNumberError: boolean
  streetNameError: boolean
  postalError: boolean

  phoneNumberErrorMsg: string
  streetNameErrorMsg: string
  postalErrorMsg: string



  constructor(private breadcrumbService: BreadcrumbService, private router: Router,
              private sessionService: SessionService, private servicemanService: ServicemanService,
              private service: MessageService
  ) {
      this.breadcrumbService.setItems([
        {label: 'My Information'},
        {label: 'Account Information', routerLink: ['account-screen']}
      ]); 
    }



  ngOnInit() {

    this.serviceman = this.sessionService.getCurrentServiceman()
    this.name = this.serviceman.name
    this.phoneNumber = this.serviceman.phoneNumber
    this.rod = this.convertUTCStringToSingaporeDate(this.serviceman.rod)
    this.email = this.serviceman.email
    this.streetName = this.serviceman.address.streetName
    this.unitNumber = this.serviceman.address.unitNumber
    this.buildingName = this.serviceman.address.buildingName
    this.postal = this.serviceman.address.postal
    this.gender = this.serviceman.gender

    this.newPassword=""
    this.confirmNewPassword=""

    this.phoneNumberError = false
    this.streetNameError = false
    this.postalError = false

    this.fieldsUpdated = false
    this.editFields = false

  }

  update(updateForm: NgForm) {

    this.clearErrors()

    if (updateForm.valid) {

      this.serviceman.phoneNumber = this.phoneNumber
      this.serviceman.address.streetName = this.streetName
      this.serviceman.address.unitNumber = this.unitNumber
      this.serviceman.address.buildingName = this.buildingName
      this.serviceman.address.postal = this.postal

      this.servicemanService.updateAccount(this.serviceman).subscribe(
        response => {
            // this.serviceman = response.serviceman
            this.sessionService.setCurrentServiceman(this.serviceman)
            this.updateProfile()
            this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Account Updated Successfully' });
       
        },
        error => {
          this.serviceman = this.sessionService.getCurrentServiceman()

          if (error.toLowerCase().includes("phone number")) {
            this.phoneNumberErrorMsg = error.substring(37)
            this.phoneNumberError = true
          }
          if (error.toLowerCase().includes("street name")) {
            this.streetNameErrorMsg = error.substring(37)
            this.streetNameError = true
          }
          if (error.toLowerCase().includes("postal")) {
            this.postalErrorMsg = error.substring(37)
            this.postalError = true
          }
        }
      )
      this.fieldsUpdated = false
    }

  }

  updateProfile() {
    this.editFields = !this.editFields
    this.clearErrors()
    this.fieldsUpdated = false
    this.phoneNumber = this.serviceman.phoneNumber
    this.streetName = this.serviceman.address.streetName
    this.unitNumber = this.serviceman.address.unitNumber
    this.buildingName = this.serviceman.address.buildingName
    this.postal = this.serviceman.address.postal
  }

  fieldChange() {
    this.fieldsUpdated = true
  }

  change(changePasswordForm: NgForm) {

    if ((this.newPassword == "" && this.confirmNewPassword == "")) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'Do not leave any fields empty' })
    }
    else if (this.newPassword == this.password) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'New Password must be different from Current Password' })
    }
    else if (this.newPassword != this.confirmNewPassword) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'New and Confirm Passwords do not match' })
    }
    else if (this.newPassword.length < 8) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'New password must be at least 8 characters.' })
    }
    else {
      this.updatePassword(this.email, this.password, this.newPassword, this.confirmNewPassword)
    }
          
  }


  updatePassword(email: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.changePassword(email, oldPassword, newPassword, confirmNewPassword).subscribe(
      response => {
        (async () => {   
          this.msgForDialog = []
          this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Password changed successfully' })

          await this.delay(1000)

          this.clearDialog()     
        })(); 
      }, error => {
          this.msgForDialog = []
          this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(37) })
        }       
    );
  }


  clearErrors() {
    this.phoneNumberError = false
    this.streetNameError = false
    this.postalError = false

  }

  convertUTCStringToSingaporeDate(dateCreated) {

    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+stringUtcTime.substring(5, 7)-1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))));
    }
  }

  clearDialog(){
    this.password=""
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.msgForDialog = []
    this.displayModal = false
  }

  openModal(){
    this.password = ""
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.displayModal = true
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
