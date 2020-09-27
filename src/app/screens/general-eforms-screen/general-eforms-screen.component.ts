import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';
import { FormInstance, FormInstanceField } from 'src/app/classes/forminstance/forminstance'


import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


import {BreadcrumbService} from '../../services/breadcrum.service';


@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css'],
  providers: [MessageService]

})
export class GeneralEFormsScreenComponent implements OnInit {

  formInstances: FormInstance []
  selectedFormInstance: FormInstance
  selectedFormInstanceName: string
  selectedFormInstanceDate: Date
  selectedFormInstanceQuestions: string[]
  selectedFormInstanceFields: FormInstanceField[]


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
    this.selectedFormInstance = formInstance
    this.selectedFormInstanceName = this.selectedFormInstance.formTemplateMapping.formTemplateName
    this.selectedFormInstanceDate = this.selectedFormInstance.formTemplateMapping.dateCreated
    this.selectedFormInstanceFields = this.selectedFormInstance.formInstanceFields
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
