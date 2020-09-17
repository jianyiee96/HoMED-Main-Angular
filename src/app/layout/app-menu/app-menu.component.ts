import { Component } from '@angular/core';
import {AppMainComponent} from '../app-main/app-main.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {

    model: any[]

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Home Page', icon: 'home', routerLink: ['/home-screen']},
            {
                label: 'My Information', icon: 'list',  routerLink: ['/components'], badgeStyleClass: 'orange-badge',
                items: [
                    {label: 'Account Information', icon: 'account_circle', routerLink: ['']},
                    {label: 'Medical Information', icon: 'local_hospital', routerLink: ['']}
                ]
            },
            
        ];
    }

    onMenuClick() {
        this.app.menuClick = true
    }

}
