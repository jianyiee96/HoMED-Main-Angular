import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent {
  title = 'HoMED-Main-Angular'

  constructor(private bnIdle: BnNgIdleService, private service: MessageService, 
              private router: Router, private sessionService: SessionService) {}
              
  startTimer() {
    this.bnIdle = new BnNgIdleService()
    console.log("Starting timer for web application.")

    this.bnIdle.startWatching(30).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.bnIdle.stopTimer()
        this.service.add({ key: 'tst', severity: 'info', summary: 'Inactivity for the past 15 minutes.', 
          detail: 'You have been logged out due to security reasons.', life:30000 });
        this.logout()
      }
    });
  }

  stopTimer() {
    try {
      console.log("Stopping timer for web application.")
      this.bnIdle.stopTimer()
    } catch (error) {
      console.log("Unable to stop timer as its undefined.")
    }
  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentServiceman(null);
    this.router.navigate(["/login-screen"]);
  }


}
