import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

const PRIMARY_TIMER_SEC: number = 15 * 60
const SECONDARY_TIMER_SEC: number = 60

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService, ConfirmationService]
})


export class AppComponent implements OnInit {

  primaryTimer: BnNgIdleService
  interval: any
  timeLeft: number

  title = 'HoMED-Main-Angular'

  constructor(private messageService: MessageService,
    private router: Router, private sessionService: SessionService,
    private confirmationService: ConfirmationService) { }


  ngOnInit() {
    if (this.sessionService.getCurrentServiceman() != null) {
      this.startTimer()
    }
  }

  startTimer() {
    this.messageService.clear(); // clear all toast
    this.primaryTimer = new BnNgIdleService()
    this.primaryTimer.startWatching(PRIMARY_TIMER_SEC).subscribe((primaryTimedOut: boolean) => {
      if (primaryTimedOut) {
        this.primaryTimer.stopTimer()

        this.timeLeft = SECONDARY_TIMER_SEC
        this.interval = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            clearInterval(this.interval);
            this.logout()
            this.addTimeoutToast()
            this.confirmationService.close()
            this.timeLeft = SECONDARY_TIMER_SEC;
          }
        }, 1000)

        this.confirm()
      }

    });

  }

  stopTimer() {
    try {
      this.primaryTimer.stopTimer()
    } catch (error) {
      // No timer to stop
    }
  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentServiceman(null);
    this.router.navigate(["/login-screen"]);
  }

  addTimeoutToast() {
    this.messageService.add({
      key: 'timeout', severity: 'info', summary: 'Your session has expired',
      detail: 'You have been logged out due to security reasons', life: 30000
    });
  }

  addSessionToast() {
    this.messageService.add({
      key: 'session', severity: 'info', summary: 'Duplicate login detected',
      detail: 'You have been logged out due to security reasons', life: 30000
    });
  }


  confirm() {
    this.confirmationService.confirm({
      header: 'Your session will expire in ' + this.timeLeft + ' seconds',
      icon: 'pi pi-exclamation-triangle',
      message: 'Would you like to extend your session?',
      acceptLabel: 'Extend',
      rejectLabel: 'Logout',
      accept: () => {
        clearInterval(this.interval);
        this.timeLeft = SECONDARY_TIMER_SEC
        this.startTimer()
      },
      reject: () => {
        clearInterval(this.interval);
        this.timeLeft = SECONDARY_TIMER_SEC
        this.logout()
        this.addTimeoutToast()
      }
    });
  }

}
