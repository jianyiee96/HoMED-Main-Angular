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
            {label: 'Account Information', icon: 'account_circle', routerLink: ['/account-screen']},
            {
                label: 'eForm Management', icon: 'list',  routerLink: ['/information'], badgeStyleClass: 'orange-badge',
                items: [      

                    {label: 'General eForms', icon: 'content_copy', routerLink: ['/medical-screen']},
                    {label: 'Medical Board eForms', icon: 'content_copy', routerLink: ['/medical-screen']}
                ]
            },
            
        ];
    }

    onMenuClick() {
        this.app.menuClick = true
    }

}
