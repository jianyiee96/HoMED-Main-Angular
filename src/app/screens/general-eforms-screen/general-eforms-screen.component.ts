import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SessionService } from 'src/app/services/session/session.service';
import { ServicemanService } from 'src/app/services/serviceman/serviceman.service';
import { FormService } from 'src/app/services/form/form.service';
import { FormInstance } from 'src/app/classes/forminstance/forminstance'


import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css']

})
export class GeneralEFormsScreenComponent implements OnInit {

  formInstances: FormInstance []

  constructor(private breadcrumbService: BreadcrumbService, private sessionService: SessionService, 
              private servicemanService: ServicemanService, private formService: FormService
  ) { 
      this.breadcrumbService.setItems([
        {label: 'eForm Management'},
        {label: 'General eForms', routerLink: ['general-eforms-screen']}
      ]);
   }

  ngOnInit() {

    this.formService.retrieveAllServicemanFormInstances().subscribe(
      response => {
				this.formInstances = response.formInstances
			},
			error => {
				console.log(error.substring(32));
			}
    );

  }





}
