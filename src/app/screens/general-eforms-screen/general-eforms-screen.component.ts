import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';
import { FormInstance, FormInstanceField, FormInstanceFieldValue } from 'src/app/classes/forminstance/forminstance'

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


import { BreadcrumbService } from '../../services/breadcrum.service';
import { FormField } from 'src/app/classes/formfield/formfield';
import { InputTypeEnum } from 'src/app/classes/inputtype-enum';


@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css'],
  providers: [MessageService]

})
export class GeneralEFormsScreenComponent implements OnInit {

  formInstances: FormInstance[]
  selectedFormInstance: FormInstance

  selectedFieldValues: { [position: number]: any } = {}



  msgForDialog: Message[] = []
  selected: boolean

  constructor(private breadcrumbService: BreadcrumbService, private formService: FormService,
    private service: MessageService, private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([
      { label: 'eForm Management' },
      { label: 'General eForms', routerLink: ['/general-eforms-screen'] }
    ]);
  }

  // Process FormInstanceFields into String[]
  formInstanceToView() {
    for (let field of this.selectedFormInstance.formInstanceFields) {


      if (field.formFieldMapping.inputType.toString().toUpperCase() === "TEXT") {
        this.selectedFieldValues[field.formInstanceFieldId] = field.formInstanceFieldValues[0].inputValue
      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "NUMBER") {
        this.selectedFieldValues[field.formInstanceFieldId] = Number(field.formInstanceFieldValues[0].inputValue)
      }


      else if (field.formFieldMapping.inputType.toString().toUpperCase() === "CHECK_BOX") {


        this.selectedFieldValues[field.formInstanceFieldId] = []

        for (let fieldValue of field.formInstanceFieldValues) {
          this.selectedFieldValues[field.formInstanceFieldId].push(fieldValue.inputValue)
        }

        if (this.selectedFieldValues[field.formInstanceFieldId].length == 0) {
          this.selectedFieldValues[field.formInstanceFieldId].push("")
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "MULTI_DROPDOWN") {

        this.selectedFieldValues[field.formInstanceFieldId] = []

        for (let fieldValue of field.formInstanceFieldValues) {
          this.selectedFieldValues[field.formInstanceFieldId].push(new FormInstanceFieldValue(undefined, fieldValue.inputValue))
        }

      }

    }

  }

  // Places String[] into respective FormInstanceFields
  formInstanceToData() {
    for (let field of this.selectedFormInstance.formInstanceFields) {


      if (field.formFieldMapping.inputType.toString().toUpperCase() === "TEXT") {
        field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId])

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "NUMBER") {
        field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId].toString())
      }

      else if (field.formFieldMapping.inputType.toString().toUpperCase() === "CHECK_BOX") {

        field.formInstanceFieldValues = []

        for (let inputValue of this.selectedFieldValues[field.formInstanceFieldId]) {
          field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, inputValue))
        }

        if (this.selectedFieldValues[field.formInstanceFieldId].length == 0) {
          field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, ""))
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "MULTI_DROPDOWN") {

        field.formInstanceFieldValues = []

        for (let inputValue of this.selectedFieldValues[field.formInstanceFieldId]) {
          field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, inputValue.formFieldOptionValue))
        }

        if (this.selectedFieldValues[field.formInstanceFieldId].length == 0) {
          field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, ""))
        }

      }



    }

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
    this.formInstanceToData()
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

  clearDialog() {
    this.msgForDialog = []
    this.selected = false
  }

  select(formInstance: FormInstance) {

    this.selectedFormInstance = formInstance
    console.log(this.selectedFormInstance)
    let index = 1

    this.selected = true
    this.formInstanceToView()
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
