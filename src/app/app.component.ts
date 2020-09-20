import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { MessageService } from 'primeng/api';

import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService, ConfirmationService]
})


export class AppComponent implements OnInit {

  primaryTimer : BnNgIdleService
  secondaryTimer : BnNgIdleService

  title = 'HoMED-Main-Angular'

  constructor( private messageService: MessageService, 
              private router: Router, private sessionService: SessionService,
              private confirmationService: ConfirmationService) {}


  ngOnInit() {
    if (this.sessionService.getCurrentServiceman() != null) {
      this.startTimer()
      
    }
  }   
  
       
  startTimer() {
    this.messageService.clear(); // clear all toast
    this.primaryTimer = new BnNgIdleService()
    console.log("Starting primary timer for web application.")

    this.primaryTimer.startWatching(10).subscribe((primaryTimedOut: boolean) => {
        if (primaryTimedOut) {
          this.primaryTimer.stopTimer()
          this.primaryTimer = new BnNgIdleService() // safety net to remove first timer

          this.secondaryTimer = new BnNgIdleService()
          this.secondaryTimer.startWatching(5).subscribe((secondaryTimeOut: boolean) => {
            console.log("Starting secondary timer for web application.")
            if(secondaryTimeOut) {
              this.secondaryTimer.stopTimer()
              this.secondaryTimer = new BnNgIdleService() //safety net
              this.logout()
              this.addTimeoutToast()
              this.confirmationService.close()
            }
          })

          this.confirm(this.secondaryTimer)  
        }
      
    });

  }

  stopTimer() {
    try {
      console.log("Stopping all timers for web application.")
      this.primaryTimer.stopTimer()
      this.secondaryTimer.stopTimer()
    } catch (error) {
      console.log("Unable to stop timer as its undefined.")
    }
  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentServiceman(null);
    this.router.navigate(["/login-screen"]);
  }

  addTimeoutToast() {
    this.messageService.add({ key: 'timeout', severity: 'info', summary: 'Your session has expired', 
          detail: 'You have been logged out due to security reasons', life:30000 });
  } 


  confirm(secondaryTimer: BnNgIdleService) {
    this.confirmationService.confirm({
        header: 'Your session is about to expire in',
        icon: 'pi pi-exclamation-triangle',
        message: 'Would you like to extend your session?',
        acceptLabel: 'Extend',
        rejectLabel: 'Logout',
        accept: () => {
          secondaryTimer.stopTimer()
          this.secondaryTimer = new BnNgIdleService
          this.startTimer()
        },
        reject: () => {
          secondaryTimer.stopTimer()
          this.secondaryTimer = new BnNgIdleService
          this.logout()
          this.addTimeoutToast()          
        }
    });
}

}
