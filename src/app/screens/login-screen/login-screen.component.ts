import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'] 
})
export class LoginScreenComponent implements OnInit {

  nric: string = "s9876543z"
  password: string = "password"

  
  constructor(
    private location: Location,
    private router: Router,
    private servicemanService: ServicemanService, 
    private sessionService: SessionService) { 
  }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    
    if (loginForm.valid) {

      this.sessionService.setNric(this.nric)
      this.sessionService.setPassword(this.password)

      this.servicemanService.servicemanLogin(this.nric, this.password).subscribe(
        response => {
          let serviceman: Serviceman = response.serviceman

          if (serviceman != null) {

            this.sessionService.setIsLogin(true)
            this.sessionService.setCurrentServiceman(serviceman)
            this.router.navigate(['/home-screen'])
            console.log(`Serviceman ${this.nric} logged in successfully`)

          } else {

            console.log(`Serviceman ${this.nric} failed to log in`)

          }
        },
        error => {

          console.log(`Serviceman ${this.nric} failed to log in due to error: ${error}`)
          
        }
      )
    }

  }

  clear() {
    this.nric = ""
    this.password = ""
  }

}
