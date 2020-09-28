import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';
import { FormInstance, FormInstanceField, FormInstanceFieldValue } from 'src/app/classes/forminstance/forminstance'


import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


import {BreadcrumbService} from '../../services/breadcrum.service';
import { FormField } from 'src/app/classes/formfield/formfield';
import { InputTypeEnum } from 'src/app/classes/inputtype-enum';


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
  formInstanceInputNgModels: { [key: number]: FormInstanceFieldValue[] } = {}
  formInstanceInputNgModelsMultiSelect: { [key: number]: string[] } = {}



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

  unloadNgModels() {

    this.selectedFormInstance.formInstanceFields.forEach((fif) => {

      this.formInstanceInputNgModels[fif.formInstanceFieldId] = fif.formInstanceFieldValues

      if (fif.formFieldMapping.inputType === InputTypeEnum.CHECK_BOX || fif.formFieldMapping.inputType == InputTypeEnum.MULTI_DROPDOWN) {

        // necessary to check and load any values the user has selected before
        if (this.formInstanceInputNgModels[fif.formInstanceFieldId].length > 0) {

          this.formInstanceInputNgModels[fif.formInstanceFieldId].forEach((fifv) => {

            if (this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] == undefined) {
              this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] = []
            }
            // multi_dropdown selected values need to be loaded in a string[] for comparison in View
            this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId].push(fifv.inputValue)

          })

        }
      
      } else if (this.formInstanceInputNgModels[fif.formInstanceFieldId].length == 0) {

        // only called if the form has not been saved before; meaning will have null fifv
        this.injectEmptyFormInstanceFieldValue(fif.formInstanceFieldId)

      }
    })
  }

  loadNgModels() {

    this.selectedFormInstance.formInstanceFields.forEach((fif) => {


      if (fif.formFieldMapping.inputType == InputTypeEnum.MULTI_DROPDOWN || fif.formFieldMapping.inputType == InputTypeEnum.CHECK_BOX) {

        this.formInstanceInputNgModels[fif.formInstanceFieldId] = []

        if (this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId] != undefined) {
          this.formInstanceInputNgModelsMultiSelect[fif.formInstanceFieldId].forEach((option) => {
            const newFifv = new FormInstanceFieldValue(undefined, option)
            this.formInstanceInputNgModels[fif.formInstanceFieldId].push(newFifv)
          })
        }
      }

      fif.formInstanceFieldValues = this.formInstanceInputNgModels[fif.formInstanceFieldId]

    })

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


  
  injectEmptyFormInstanceFieldValue(formInstanceFieldId: number) {
    this.formInstanceInputNgModels[formInstanceFieldId].push(new FormInstanceFieldValue(undefined, ""))
  }

  updateFormInstance() {
    this.loadNgModels()
		this.formService.updateFormInstanceFieldValues(this.selectedFormInstance).subscribe(
			response => {
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
    this.unloadNgModels()
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
