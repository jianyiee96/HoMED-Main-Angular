import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app-main.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

    model: any[]

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Home Page', icon: 'pi pi-fw pi-home', routerLink: ['/home-screen']},
            {label: 'Account Information', icon: 'pi pi-fw pi-id-card', routerLink: ['/account-screen']},
            {label: 'Booking Management', icon: 'pi pi-fw pi-calendar', routerLink: ['/booking-management-screen']},
            {label: 'General eForms', icon: 'pi pi-fw pi-file', routerLink: ['/general-eforms-screen']},
            {label: 'Consultation', icon: 'pi pi-fw pi-list', routerLink: ['/consultation-screen']},
            {label: 'Medical Review', icon: 'pi pi-fw pi-search-plus', routerLink: ['/medical-review-screen']},
            
        ];
    }

    onMenuClick() {
        this.app.menuClick = true
    }

}
