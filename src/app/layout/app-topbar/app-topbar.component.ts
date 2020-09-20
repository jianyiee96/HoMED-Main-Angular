import { Component, OnInit } from '@angular/core';
import {AppMainComponent} from '../app-main/app-main.component';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  serviceman: Serviceman

  constructor(public app: AppMainComponent, private router: Router, private sessionService: SessionService,
              public appForTimer: AppComponent) {}

  ngOnInit() {
    this.serviceman = this.sessionService.getCurrentServiceman()
  }

  logout() {
    this.sessionService.setIsLogin(false)
    this.sessionService.setCurrentServiceman(null)
    this.router.navigate(["/login-screen"])
    this.appForTimer.stopTimer()
  }

}
