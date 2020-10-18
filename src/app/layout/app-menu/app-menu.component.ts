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
            {
                label: 'eForm Management', icon: 'pi pi-fw pi-folder',  routerLink: ['/information'],
                items: [      

                    {label: 'General eForms', icon: 'pi pi-fw pi-file', routerLink: ['/general-eforms-screen']},
                    {label: 'Medical Board eForms', icon: 'pi pi-fw pi-file', routerLink: ['/medical-screen']}
                ]
            },
            
        ];
    }

    onMenuClick() {
        this.app.menuClick = true
    }

}
