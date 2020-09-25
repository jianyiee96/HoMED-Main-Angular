import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css']
})
export class GeneralEFormsScreenComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      {label: 'eForm Management'},
      {label: 'General eForms', routerLink: ['general-eforms-screen']}
    ]);
  }

  ngOnInit() {
  }

}
