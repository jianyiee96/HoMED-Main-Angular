import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
  providers: [] 
})
export class LoginScreenComponent implements OnInit {

  nric: string 
  nricResetPass: string
  password: string 
  newPassword:  string
  confirmNewPassword: string
  email: string
  msgs: Message[] = []
  msgForActivationDialog: Message[] = []
  msgForForgetPasswordDialog: Message[] = []
  displayModal: boolean
  displayResetPasswordModal: boolean
  label: string = "Password"
  activated:  string = "Account not activated?"

  
  constructor(
    private router: Router,
    private servicemanService: ServicemanService, 
    private sessionService: SessionService,
  ) { 
  }

  ngOnInit() {
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.nric = ""
    this.email = ""
    this.nricResetPass = ""
  }

  login(loginForm: NgForm) {
    
    if (loginForm.valid) {

      this.sessionService.setNric(this.nric)
      this.sessionService.setPassword(this.password)

      this.servicemanService.login(this.nric, this.password).subscribe(
        response => {
          let serviceman: Serviceman = response.serviceman

          if (serviceman != null) {

            if (serviceman.isActivated) {
              if (this.label == "One Time Password") {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: '', detail: 'Account has already been activated.' })
                this.password = ""
                this.changeLabelName()
              }
              else {
                this.sessionService.setIsLogin(true)
                this.sessionService.setCurrentServiceman(serviceman)
                this.router.navigate(['/home-screen'])
              }
            } else {
                if (this.label == "Password")  {
                  this.msgs = [];
                  this.msgs.push({ severity: 'error', summary: '', detail: 'Account has not been activated.' })
                  this.changeLabelName()
                  
                }
                else {
                  this.openActivationModal()  
                }                     
            }
          } else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: '', detail: 'Serviceman account does not exist.' })
          }
        },
        error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '', detail: 'Wrong NRIC or Password' })         
        }
      )
    }

  }

  activate(activationForm: NgForm) {
    
    if ((this.newPassword == "" && this.confirmNewPassword == "" && this.password =="")) {
      this.msgForActivationDialog = []
      this.msgForActivationDialog.push({ severity: 'error', summary: '', detail: 'Do not leave any fields empty' })
    }
    else if (this.newPassword != this.confirmNewPassword) {
      this.msgForActivationDialog = []
      this.msgForActivationDialog.push({ severity: 'error', summary: '', detail: 'Passwords do not match' })
    }
    else if (this.newPassword.length < 8) {
      this.msgForActivationDialog = []
      this.msgForActivationDialog.push({ severity: 'error', summary: '', detail: 'New password must be at least 8 characters.' })
    }
    else if (this.newPassword == this.password) {
      this.msgForActivationDialog = []
      this.msgForActivationDialog.push({ severity: 'error', summary: '', detail: 'New password must be different from OTP.' })
    }
    else {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: '', detail: 'Activated! Please log in now' })
      this.activateAccount(this.nric, this.password, this.newPassword)
    }
          
  }

  activateAccount(nric: string, oldPassword: string, newPassword: string) {
    this.servicemanService.changePassword(nric, oldPassword, newPassword).subscribe(
      response => {
        this.displayModal = false
        this.label = "Password"
        this.activated = "Account not activated?"
        this.password = ""
      }, error => {
        this.msgForActivationDialog = []
        this.msgForActivationDialog.push({ severity: 'error', summary: '', detail: 'Please redo activation' })
      }
    );
  }

  reset(forgetPasswordForm: NgForm) {
    
    if ((this.email == "" && this.nricResetPass == "")) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'Do not leave any fields empty' })
    }
    else if (this.nricResetPass.length != 9) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'Please enter a valid NRIC.' })
    }
    else if (this.email.length < 10 || this.email.length > 64) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'Please enter a valid email.' })
    }   
    else {
      this.resetPassword(this.nricResetPass, this.email)
    }
          
  }

  resetPassword(nric: string, email: string) {
    this.servicemanService.resetPassword(nric, email).subscribe(
      response => {
        this.clearResetDialog()
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: '', detail: 'OTP Sent. Please check your email.' })
      }, error => {
        this.msgForForgetPasswordDialog = []
        this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'NRIC does not match with the email entered. Please try again.' })
        this.email = ""
      }
    )
  }

  changeLabelName() {

      if (this.activated == "Account activated?") {
        this.label = "Password"
        this.activated = "Account not activated?"
        this.msgs = [];
        this.password = ""
      }
      else {
        this.label = "One Time Password"
        this.activated = "Account activated?"
        this.msgs = [];
        this.password = ""
      }
  }

  openActivationModal() {
    this.displayModal = true  
  }

  openResetPassModal() {
    this.displayResetPasswordModal = true  
  }

  clearDialog(){
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.msgForActivationDialog = []
    this.displayModal = false
  }

  clearResetDialog() {
    this.resetFields() 
    this.msgForForgetPasswordDialog = []
    this.displayResetPasswordModal = false
  }

  resetFields() {
    this.email = ""
    this.nricResetPass = ""
    this.nric = ""
    this.password = ""
  }

     
} 
  

  



