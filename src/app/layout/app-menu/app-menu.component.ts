import { Component, OnInit } from '@angular/core';
import {AppMainComponent} from '../app-main/app-main.component';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {

    model: any[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'dashboard', routerLink: ['/']},
            {
                label: 'Components', icon: 'list', badge: '2', routerLink: ['/components'], badgeStyleClass: 'orange-badge',
                items: [
                    {label: 'Sample Page', icon: 'desktop_mac', routerLink: ['/components/sample']},
                    {label: 'Forms', icon: 'input', routerLink: ['/components/forms']},
                    {label: 'Data', icon: 'grid_on', routerLink: ['/components/data']},
                    {label: 'Panels', icon: 'content_paste', routerLink: ['/components/panels']},
                    {label: 'Overlays', icon: 'content_copy', routerLink: ['/components/overlays']},
                    {label: 'Menus', icon: 'menu', routerLink: ['/components/menus']},
                    {label: 'Messages', icon: 'message', routerLink: ['/components/messages']},
                    {label: 'Charts', icon: 'insert_chart', routerLink: ['/components/charts']},
                    {label: 'File', icon: 'attach_file', routerLink: ['/components/file']},
                    {label: 'Misc', icon: 'toys', routerLink: ['/components/misc']}
                ]
            },
            {
                label: 'Template Pages', icon: 'get_app', routerLink: ['/pages'],
                items: [
                    {label: 'Empty Page', icon: 'hourglass_empty', routerLink: ['/pages/empty']},
                    {label: 'Landing Page', icon: 'flight_land', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login Page', icon: 'verified_user', routerLink: ['/login'], target: '_blank'},
                    {label: 'Error Page', icon: 'error', routerLink: ['/error'], target: '_blank'},
                    {label: '404 Page', icon: 'error_outline', routerLink: ['/404'], target: '_blank'},
                    {label: 'Access Denied Page', icon: 'security', routerLink: ['/accessdenied'], target: '_blank'}
                ]
            },
            {
                label: 'Menu Hierarchy', icon: 'menu',
                items: [
                    {
                        label: 'Submenu 1', icon: 'subject',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'subject',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'subject'},
                                    {label: 'Submenu 1.1.2', icon: 'subject'},
                                    {label: 'Submenu 1.1.3', icon: 'subject'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'subject',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'subject'},
                                    {label: 'Submenu 1.2.2', icon: 'subject'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'subject',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'subject',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'subject'},
                                    {label: 'Submenu 2.1.2', icon: 'subject'},
                                    {label: 'Submenu 2.1.3', icon: 'subject'}
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'subject',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'subject'},
                                    {label: 'Submenu 2.2.2', icon: 'subject'}
                                ]
                            },
                        ]
                    }
                ]
            },
            {label: 'Utils', icon: 'build', routerLink: ['/utils']},
            {label: 'Docs', icon: 'find_in_page', routerLink: ['/documentation']}
        ];
    }

    onMenuClick() {
        this.app.menuClick = true;
    }

}
