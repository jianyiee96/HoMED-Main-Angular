import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  //constructor(private router: Router, private sessionService: SessionService) { }

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        {label: ''}
    ]);
}

  ngOnInit(): void {
  }

  // logout() {
  //   this.sessionService.setIsLogin(false);
  //   this.sessionService.setCurrentServiceman(null);
  //   this.router.navigate(["/login-screen"]);
  // }

}
