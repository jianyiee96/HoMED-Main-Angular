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
  displayModal: boolean

  edit: boolean
  fieldsUpdated: boolean

  emailError = false



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
    this.edit = false

  }

  update(updateForm: NgForm) {

    this.clearErrors()

    if (updateForm.valid) {



      this.servicemanService.updateAccount(this.serviceman).subscribe(
        response => {
          this.serviceman = response.serviceman
          this.sessionService.setCurrentServiceman(this.serviceman)
          this.editForm()
          this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Account Updated Successfully' });
        },
        error => {
          this.serviceman = this.sessionService.getCurrentServiceman()
          if (error.includes("for key 'EMAIL'")) {
            this.emailError = true
          }
          if (error.includes("for key 'PHONENUMBER'")) {

          }
        }
      )
      this.fieldsUpdated = false
    }

  }

  editForm() {
    this.edit = !this.edit
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
      this.clearDialog()
      this.updatePassword(this.nric, this.password, this.newPassword)
    }
          
  }


  updatePassword(nric: string, oldPassword: string, newPassword: string) {
    console.log(oldPassword)
    this.servicemanService.changePassword(nric, oldPassword, newPassword).subscribe(
      response => {
        this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Password changed successfully' });
      }, error => {
          if (error.includes("password do not match password associated with account")) {

          }
        }       
    );
  }

  clearErrors() {
    this.emailError = false
  }

  parseDate(date: any) {
    console.log(date)
    return date.toString().replace('[UTC]', '');
  }

  clearDialog(){
    this.password =""
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.msgForDialog = []
    this.displayModal = false
  }

}
