import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app-main.component';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { Message, ConfirmationService, LazyLoadEvent, PrimeNGConfig, MenuItem } from 'primeng/api';
import { AppComponent } from '../../app.component'
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Notification } from 'src/app/classes/notification/notification';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationTypeEnum } from 'src/app/classes/notificationtype-enum';
import { interval } from 'rxjs';


@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  serviceman: Serviceman
  allNotifications: Notification[] = []
  notiHover: Boolean
  msgForDialog: Message[] = []
  selectedNotification: Notification
  unreadCounter: number
  pollInterval: number
  items: MenuItem[];
  display: boolean = false;
  displayNotfication: Notification

  constructor(public app: AppMainComponent, private router: Router, private sessionService: SessionService,
    private notificationService: NotificationService, private messageService: MessageService, private primengConfig: PrimeNGConfig,
    public appForTimer: AppComponent) { }

  ngOnInit() {
    this.displayNotfication = new Notification
    this.loadHomeContent()
    this.pollInterval = 3000

    interval(this.pollInterval).subscribe(_ => {
      this.checkForUnfetchedNotifications()
    })
    this.serviceman = this.sessionService.getCurrentServiceman()
  }

  checkForUnfetchedNotifications() {
    this.notificationService.hasUnfetchedNotifications().subscribe(
      response => {
        response.hasUnfetchedNotifications === true ? this.loadHomeContent() : null
      },
      error => {
        console.log(error);
      }
    )
  }

  showDialog(notification: Notification) {
    this.display = true;
    this.displayNotfication = notification
  }

  numLines(str: String) {
    return str.split(/\r\n|\r|\n/).length
  }

  getMenuItems(notification: Notification): MenuItem[] {
    return [{
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        this.deleteNotification(notification);
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {

      }
    }
    ];
  }

  loadHomeContent() {
    
    this.unreadCounter = 0;
    this.notiHover = false
    this.serviceman = this.sessionService.getCurrentServiceman()
    this.notificationService.retrieveAllServicemanNotifications().subscribe(
      response => {
        this.allNotifications = response.notifications
        this.allNotifications.forEach(n => {
          n.notificationDate = this.convertUTCStringToSingaporeDate(n.notificationDate)
          if (!n.isRead) {
            this.unreadCounter = this.unreadCounter + 1;
          }
        })
        this.allNotifications.sort((x, y) => (y.notificationDate.getTime() - x.notificationDate.getTime()))
      }, error => {
        console.error(error)
      }
    );

  }

  toDisable() {
    
    return document.getElementById('msg').innerHTML.includes('...')
  }

  deleteNotification(notification) {
    this.notificationService.deleteNotification(notification.notificationId).subscribe(
      response => {
      }, error => {
        console.error(error)
      }
    )
  }

  redirecting(notification: Notification) {
    this.notificationService.readNotification(notification.notificationId).subscribe(
      response => {
        this.ngOnInit()
      }, error => {
        console.error(error)
      }
    )
    let url = ""
    if (notification.notificationTypeEnum === NotificationTypeEnum.BOOKING) {
      url = url + "/booking-management-screen"
      if (notification.dynamicId !== undefined) {
        url = url + "/" + notification.dynamicId
      }
    }
    if (notification.notificationTypeEnum === NotificationTypeEnum.CONSULTATION) {
      url = url + "/consultation-screen"
      if (notification.dynamicId !== undefined) {
        url = url + "/" + notification.dynamicId
      }
    }
    if (notification.notificationTypeEnum === NotificationTypeEnum.FORM) {
      url = url + "/general-eforms-screen"
      if (notification.dynamicId !== undefined) {
        url = url + "/" + notification.dynamicId
      }
    }
    if (notification.notificationTypeEnum === NotificationTypeEnum.MEDICAL_BOARD) {
      url = url + "/medical-review-screen"
    }

    this.router.navigate([url])
  }

  readAllNotifications() {
    this.notificationService.readAllNotifications().subscribe(
      response => {
        this.ngOnInit()
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteAllNotifications() {
    this.notificationService.deleteAllNotifications().subscribe(
      response => {
        console.log(`deleted all`);
        this.ngOnInit();
      },
      error => {
        console.log(error);

      }
    )
  }

  logout() {
    this.sessionService.setIsLogin(false)
    this.sessionService.setCurrentServiceman(null)
    this.router.navigate(["/login-screen"])
    this.appForTimer.stopTimer()
  }

  convertUTCStringToSingaporeDate(dateCreated) {
    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+stringUtcTime.substring(5, 7) - 1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))
      ));
    }
  }

}
