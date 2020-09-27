import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';
import { FormInstance } from 'src/app/classes/forminstance/forminstance'

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';


import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css'],
  providers: [MessageService]

})
export class GeneralEFormsScreenComponent implements OnInit {

  formInstances: FormInstance []
  formInstanceId: number
  selectedFormInstance: FormInstance


  msgForDialog: Message[] = []
  displayModal: boolean

  locked: boolean

  constructor(private breadcrumbService: BreadcrumbService, private formService: FormService,
    private service: MessageService
  ) { 
      this.breadcrumbService.setItems([
        {label: 'eForm Management'},
        {label: 'General eForms', routerLink: ['/general-eforms-screen']}
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

  updateFormInstance() {
    
		this.formService.updateFormInstanceFieldValues(this.selectedFormInstance).subscribe(
			response => {
        console.log("Updated")
        this.selectedFormInstance = response.formInstance
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Form Instance Field Values Updated!' })
			},
			error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
			}
    );
    			
	}


  deleteFormInstance() {
    
		this.formService.deleteFormInstance(this.formInstanceId).subscribe(
			response => {
        this.clearDialog()
				this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Form Instance Deleted Successfully' });
			},
			error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
			}
    );
    			
  }
  
  submit(viewFormInstanceDetailsForm: NgForm) {
  
          
  }

  clearDialog(){
    this.msgForDialog = []
    this.displayModal = false
  }

  openModal(formInstance: FormInstance) {
    this.selectedFormInstance = formInstance
    console.log(this.selectedFormInstance.formTemplateMapping.formTemplateName)
    this.displayModal = true
  }



}
