import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
  providers: [] 
})
export class LoginScreenComponent implements OnInit {

  serviceman: Serviceman
  nric: string 
  nricResetPass: string
  password: string 
  newPassword:  string
  confirmNewPassword: string
  email: string
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

          this.serviceman = response.serviceman

          if (serviceman != null) {

            if (serviceman.isActivated) {
                this.sessionService.setIsLogin(true)
                this.sessionService.setCurrentServiceman(this.serviceman)
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
            this.msgs.push({ severity: 'warn', summary: '', detail: 'Wrong NRIC or Password' })         
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
      this.activateAccount(this.nric, this.password, this.newPassword)
    }
          
  }

  activateAccount(nric: string, oldPassword: string, newPassword: string) {
    this.servicemanService.changePassword(nric, oldPassword, newPassword).subscribe(
      response => {
        (async () => { 
          this.msgForActivationDialog = []  
          this.msgForActivationDialog.push({ severity: 'success', summary: '', detail: 'Account activated' })

          await this.delay(1000)

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
    
    if ((this.email == "" && this.nricResetPass == "")) {
      this.msgForForgetPasswordDialog = []
      this.msgForForgetPasswordDialog.push({ severity: 'warn', summary: '', detail: 'Do not leave any fields empty' })
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
      this.clearLoginMessage()
      this.resetPassword(this.nricResetPass, this.email)
    }
          
  }

  resetPassword(nric: string, email: string) {
    this.servicemanService.resetPassword(nric, email).subscribe(
      response => {
        (async () => {   
          this.msgForForgetPasswordDialog = []     
          this.msgForForgetPasswordDialog.push({ severity: 'success', summary: '', detail: 'OTP Sent. Please check your email.' })

          await this.delay(1000)

          this.clearResetDialog()     
        })();        
      }, error => {
        this.msgForForgetPasswordDialog = []
        this.msgForForgetPasswordDialog.push({ severity: 'error', summary: '', detail: 'NRIC does not match with the email entered. Please try again.' })
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
    this.nricResetPass = ""
    this.nric = ""
    this.password = ""
  }

  clearLoginMessage() {
    this.msgs = []  
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

     
} 
  

  



