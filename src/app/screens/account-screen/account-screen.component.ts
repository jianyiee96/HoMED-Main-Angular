import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';

import {BreadcrumbService} from '../../services/breadcrum.service';

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
  nric: string
  phoneNumber: string
  rod: Date
  email: string
  address: string
  newPassword: string
  confirmNewPassword: string
  msgForDialog: Message[] = []
  refreshPass: string
  displayModal: boolean

  editFields: boolean
  fieldsUpdated: boolean

  phoneNumberError = false
  emailError = false
  passwordError = false



  constructor(private breadcrumbService: BreadcrumbService, private router: Router,
              private sessionService: SessionService, private servicemanService: ServicemanService,
              private service: MessageService
  ) {
      this.breadcrumbService.setItems([
        {label: 'My Information'},
        {label: 'Account Information', routerLink: ['/information/data']}
      ]); 
    }



  ngOnInit() {
    this.serviceman = this.sessionService.getCurrentServiceman()
    this.name = this.serviceman.name
    this.nric = this.serviceman.nric
    this.phoneNumber = this.serviceman.phoneNumber
    this.rod = this.parseDate(this.serviceman.rod).substring(0,10)
    this.email = this.serviceman.email
    this.address = this.serviceman.address
    this.newPassword=""
    this.confirmNewPassword=""
    this.fieldsUpdated = false
    this.editFields = false

  }

  update(updateForm: NgForm) {

    this.clearErrors()

    if (updateForm.valid) {

      this.serviceman.phoneNumber = this.phoneNumber
      this.serviceman.email = this.email
      this.serviceman.address = this.address

      this.servicemanService.updateAccount(this.serviceman).subscribe(
        response => {
            this.serviceman = response.serviceman
            this.sessionService.setCurrentServiceman(this.serviceman)
            this.updateProfile()
            this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Account Updated Successfully' });
       
        },
        error => {
          this.serviceman = this.sessionService.getCurrentServiceman()

          if (error.includes('serviceman.EMAIL')) {
            this.emailError = true
          }
          if (error.includes('serviceman.PHONENUMBER')) {
            this.phoneNumberError = true
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
    this.email = this.serviceman.email
    this.address = this.serviceman.address
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
      this.updatePassword(this.nric, this.password, this.newPassword, this.confirmNewPassword)
      this.clearDialog()
    }
          
  }


  updatePassword(nric: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.changePassword(nric, oldPassword, newPassword, confirmNewPassword).subscribe(
      response => {
        this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Password changed successfully' });
        this.refreshPass = ""
      }, error => {
          if (error.includes("password do not match password associated with account")) {
            this.passwordError = true
          }
        }       
    );
  }


  clearErrors() {
    this.phoneNumberError = false
    this.emailError = false
    this.passwordError = false
  }


  parseDate(date: any) {
    return date.toString().replace('[UTC]', '');
  }

  clearDialog(){
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.msgForDialog = []
    this.displayModal = false
  }

  openModal(){
    this.password = ""
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.passwordError = false
    this.displayModal = true
  }

}
