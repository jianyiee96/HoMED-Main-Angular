import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrum.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app-breadcrumb.component.html',
  styleUrls: ['./app-breadcrumb.component.css']
})

export class AppBreadcrumbComponent implements OnDestroy {

  subscription: Subscription;

  items: MenuItem[];

  constructor(public breadcrumbService: BreadcrumbService) {
      this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
          this.items = response;
      });
    }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

}
