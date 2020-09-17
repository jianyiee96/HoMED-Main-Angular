import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
  providers: [MessageService] 
})
export class LoginScreenComponent implements OnInit {

  nric: string 
  password: string 
  newPassword:  string
  newPasswordRe: string
  msgs: Message[] = []
  msgForDialog: Message[] = []
  displayModal: boolean
  label: string = "Password"
  activated:  string = "First time here?"

  
  constructor(
    private router: Router,
    private servicemanService: ServicemanService, 
    private sessionService: SessionService,
    private service: MessageService) { 
  }

  ngOnInit() {
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
                  this.password = ""
                }
                else {
                  this.openModal()  
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
    
    if ((this.newPassword == "" && this.newPasswordRe == "")) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'Do not leave any fields empty' })
    }
    else if (this.newPassword != this.newPasswordRe) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'Passwords do not match' })
    }
    else if (this.newPassword.length < 8) {
      this.msgForDialog = []
      this.msgForDialog.push({ severity: 'error', summary: '', detail: 'New password must be at least 8 characters.' })
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
        this.activated = "First time here?"
        this.password = ""   
      }, error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: 'Please redo activation' })
      }
    );
  }

  changeLabelName() {

      if (this.activated == "Been here before?") {
        this.label = "Password"
        this.activated = "First time here?"
        this.msgs = [];
        this.password = ""
      }
      else {
        this.label = "One Time Password"
        this.activated = "Been here before?"
        this.msgs = [];
        this.password = ""
      }
  }

  openModal() {
    this.displayModal = true  
  }


  clearDialog(){
    this.newPassword = ""
    this.newPasswordRe = ""
    this.msgForDialog = []
    this.displayModal = false
  }
      
} 
  

  



