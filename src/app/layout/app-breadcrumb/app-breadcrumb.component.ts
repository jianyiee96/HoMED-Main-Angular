import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrum.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';

import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app-breadcrumb.component.html',
  styleUrls: ['./app-breadcrumb.component.css']
})

export class AppBreadcrumbComponent implements OnDestroy {

  subscription: Subscription;

  items: MenuItem[];

  serviceman: Serviceman

  constructor(public breadcrumbService: BreadcrumbService, private router: Router, private sessionService: SessionService,
              public appForTimer: AppComponent) {
      this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
          this.items = response;
      });
    }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  logout() {
    this.sessionService.setIsLogin(false)
    this.sessionService.setCurrentServiceman(null)
    this.router.navigate(["/login-screen"])
    this.appForTimer.stopTimer()
  }

}
