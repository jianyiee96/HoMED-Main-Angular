import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';

import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.component.html',
  styleUrls: ['./account-screen.component.css']
})
export class AccountScreenComponent implements OnInit {

  model: any = {};

  serviceman: Serviceman
  name: string
  password: string
  nric: string
  phoneNumber: string
  rod: Date
  email: string
  address: string

  constructor(private breadcrumbService: BreadcrumbService, private router: Router,
              private sessionService: SessionService, private servicemanService: ServicemanService,
  ) {
      this.breadcrumbService.setItems([
        {label: 'My Information'},
        {label: 'Account Information', routerLink: ['/information/data']}
      ]); 
    }



  ngOnInit() {

    this.serviceman = this.sessionService.getCurrentServiceman()
    this.name = this.serviceman.name
    this.nric = this.serviceman.nric
    this.phoneNumber = this.serviceman.phoneNumber
    this.rod = this.parseDate(this.serviceman.rod).substring(0,10)
    this.email = this.serviceman.email
    this.address = this.serviceman.address
  }


  updatePassword(nric: string, oldPassword: string, newPassword: string) {
    this.servicemanService.changePassword(nric, oldPassword, newPassword).subscribe(
      response => {
  
      }, error => {

      }
    );
  }

  parseDate(date: any) {
    console.log(date)
    return date.toString().replace('[UTC]', '');
  }

}
