import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';
import { FormInstance, FormInstanceField, FormInstanceFieldValue } from 'src/app/classes/forminstance/forminstance'


import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


import {BreadcrumbService} from '../../services/breadcrum.service';
import { FormField } from 'src/app/classes/formfield/formfield';


@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css'],
  providers: [MessageService]

})
export class GeneralEFormsScreenComponent implements OnInit {

  formInstances: FormInstance []
  selectedFormInstance: FormInstance
  tempFormFields: FormInstanceField[]



  msgForDialog: Message[] = []
  selected: boolean

  locked: boolean

  constructor(private breadcrumbService: BreadcrumbService, private formService: FormService,
    private service: MessageService, private confirmationService: ConfirmationService
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
		this.formService.deleteFormInstance(this.selectedFormInstance.formInstanceId).subscribe(
			response => {
        this.clearDialog()
        this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Form Instance Deleted Successfully' });
        this.ngOnInit()
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
    this.selected = false
  }

  select(formInstance: FormInstance) {
    this.tempFormFields = []
    this.selectedFormInstance = formInstance
    console.log(this.selectedFormInstance)
    let index = 1
    for (var i = 0; i < this.selectedFormInstance.formInstanceFields.length; i++) {
      for (let formInstanceField of this.selectedFormInstance.formInstanceFields) {
        if(formInstanceField.formFieldMapping.position === index) {
          this.tempFormFields.push(formInstanceField);
          index++;
          break;
        }
      }
    }
    this.selectedFormInstance.formInstanceFields = this.tempFormFields
    this.selected = true
  }

  confirm() {
    this.confirmationService.confirm({
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        message: 'Do you want to delete this form instance?',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.deleteFormInstance()
        },
        reject: () => {   
        }
    });
  }



}
