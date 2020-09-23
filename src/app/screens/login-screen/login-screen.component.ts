import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';
import {MessageService} from 'primeng/api';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
  providers: [MessageService] 
})
export class LoginScreenComponent implements OnInit {

  serviceman: Serviceman
  password: string 
  newPassword:  string
  confirmNewPassword: string
  email: string
  emailResetPass: string
  phoneNumber: string
  msgs: Message[] = []
  msgForActivationDialog: Message[] = []
  msgForForgetPasswordDialog: Message[] = []
  displayActivation: boolean
  displayResetPassDialog: boolean
  

  constructor(
    private router: Router,
    private servicemanService: ServicemanService, 
    private sessionService: SessionService,
    private app: AppComponent) {}

  ngOnInit() {
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.email= ""
    this.emailResetPass = ""
  }

  login(loginForm: NgForm) {
    
    if (loginForm.valid) {

      this.sessionService.setEmail(this.email)
      this.sessionService.setPassword(this.password)

      this.servicemanService.login(this.email, this.password).subscribe(
        response => {
          let serviceman: Serviceman = response.serviceman

          this.serviceman = response.serviceman

          if (serviceman != null) {

            if (serviceman.isActivated) {
                
                this.sessionService.setIsLogin(true)
                this.sessionService.setCurrentServiceman(this.serviceman)
                this.app.startTimer()
                this.router.navigate(['/home-screen'])
              }
              else {
                this.clearLoginMessage()
                this.displayActivation = true
              }
            } else {
                this.msgs.push({ severity: 'warn', summary: '', detail: 'Serviceman account does not exist.' })                        
            }
          },
          error => {
            this.clearLoginMessage()
            this.msgs.push({ severity: 'error', summary: '', detail: 'Wrong Email or Password' })         
        }
      )

    }

  }

  activate(activationForm: NgForm) {
    
    if ((this.newPassword == "" && this.confirmNewPassword == "" )) {
      this.msgForActivationDialog = []
      this.msgForActivationDialog.push({ severity: 'warn', summary: '', detail: 'Do not leave any fields empty' })
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
      this.msgForActivationDialog.push({ severity: 'warn', summary: '', detail: 'New password must be different from OTP.' })
    }
    else {
      this.clearLoginMessage()
      this.activateAccount(this.email, this.newPassword, this.confirmNewPassword)
    }
          
  }

  activateAccount(email: string, newPassword: string, confirmNewPassword: string) {
    this.servicemanService.activateAccount(email, newPassword, confirmNewPassword).subscribe(
      response => {
        (async () => { 
          this.msgForActivationDialog = []  
          this.msgForActivationDialog.push({ severity: 'success', summary: '', detail: 'Account activated, logging you in...' })

          await this.delay(1500)

          this.sessionService.setIsLogin(true)
          this.sessionService.setCurrentServiceman(this.serviceman)
          this.app.startTimer()
          this.router.navigate(['/home-screen'])      
        })();             
      }, error => {
        this.msgForActivationDialog = []
        this.msgForActivationDialog.push({ severity: 'error', summary: '', detail: 'Please redo activation' })
      }
    );
  }

  reset(forgetPasswordForm: NgForm) {
    
    if ((this.emailResetPass == "" || this.phoneNumber == "" || ((this.emailResetPass == "" && this.phoneNumber == "")))) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'warn', summary: '', detail: 'Do not leave any fields empty' })
    }
    else if (this.emailResetPass.length < 10 || this.emailResetPass.length > 64) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'Please enter a valid email.' })
    }   
    else if (this.phoneNumber.length < 8) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'Please enter a valid phone number.' })
    } 
    else {
      this.clearLoginMessage()
      this.resetPassword(this.emailResetPass, this.phoneNumber)
    }
          
  }

  resetPassword(email: string, phoneNumber: string) {
    this.servicemanService.resetPassword(email, phoneNumber).subscribe(
      response => {
        (async () => {   
          this.msgForForgetPasswordDialog = []     
          this.msgForForgetPasswordDialog.push({ severity: 'success', summary: '', detail: 'OTP Sent. Please check your email.' })

          await this.delay(1500)

          this.clearResetDialog()     
        })();        
      }, error => {
        this.msgForForgetPasswordDialog = []
        this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'Serviceman is not associated with the email entered. Please try again.' })
        this.email = ""
      }
    )
  }



  clearDialog(){
    this.newPassword = ""
    this.confirmNewPassword = ""
    this.msgForActivationDialog = []
    this.displayActivation = false
  }

  clearResetDialog() {
    this.resetFields() 
    this.msgForForgetPasswordDialog = []
    this.displayResetPassDialog = false
    this.clearLoginMessage()
  }

  resetFields() {
    this.email = ""
    this.emailResetPass = ""
    this.password = ""
  }

  clearLoginMessage() {
    this.msgs = []  
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

     
} 
  

  



