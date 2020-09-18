import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionService } from '../session/session.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
  
})
export class TimerService {

  constructor(
    private bnIdle: BnNgIdleService,
    private sessionService: SessionService,
    private router: Router) { }
  
    startTimer() {
      this.bnIdle = new BnNgIdleService()
      console.log("Starting timer for mobile application.")
  
      this.bnIdle.startWatching(10).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.bnIdle.stopTimer()
          this.presentAlert()
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


    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'You have been inactive for the past 15 minutes.',
        backdropDismiss: false,
        message: 'You will have to log back in for security reasons.',
        buttons: [
          {
            text: 'Logout',
            role: 'cancel',
            handler: () => {
              this.sessionService.setIsLogin(false)
              this.sessionService.setCurrentServiceman(null)
              this.router.navigate(["/login-screen"])
              return
            }
          }
        ],
      });
  
      await alert.present();
    }




}
