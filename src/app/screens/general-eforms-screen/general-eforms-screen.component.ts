import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FormService } from 'src/app/services/form/form.service';
import { FormInstance, FormInstanceField, FormInstanceFieldValue } from 'src/app/classes/forminstance/forminstance'

import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


import { BreadcrumbService } from '../../services/breadcrum.service';
import { FormField, FormFieldOption } from 'src/app/classes/formfield/formfield';
import { InputTypeEnum } from 'src/app/classes/inputtype-enum';
import { FormInstanceStatusEnum } from 'src/app/classes/forminstancestatus-enum';



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

  testing: any

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

      if (field.formFieldMapping.inputType.toString().toUpperCase() === "TEXT" || field.formFieldMapping.inputType.toString().toUpperCase() === "RADIO_BUTTON") {

        if (field.formInstanceFieldValues.length > 0) {
          this.selectedFieldValues[field.formInstanceFieldId] = field.formInstanceFieldValues[0].inputValue
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "NUMBER") {

        if (field.formInstanceFieldValues.length > 0) {
          this.selectedFieldValues[field.formInstanceFieldId] = Number(field.formInstanceFieldValues[0].inputValue)

        }
      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "CHECK_BOX") {

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
          if (fieldValue.inputValue != "") {
            this.selectedFieldValues[field.formInstanceFieldId].push(new FormFieldOption(undefined, fieldValue.inputValue))
          }

        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "SINGLE_DROPDOWN") {

        if (field.formInstanceFieldValues.length > 0) {
          this.selectedFieldValues[field.formInstanceFieldId] = new FormFieldOption(undefined, field.formInstanceFieldValues[0].inputValue)

        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "DATE" || field.formFieldMapping.inputType.toString().toUpperCase() === "TIME") {

        if (field.formInstanceFieldValues.length > 0) {
          this.selectedFieldValues[field.formInstanceFieldId] = new Date(field.formInstanceFieldValues[0].inputValue)

        }
      }
    }

  }

  // Places String[] into respective FormInstanceFields
  formInstanceToData() {
    for (let field of this.selectedFormInstance.formInstanceFields) {


      if (field.formFieldMapping.inputType.toString().toUpperCase() === "TEXT") {
        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId])
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "NUMBER") {
        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId].toString())
        }
      }

      else if (field.formFieldMapping.inputType.toString().toUpperCase() === "CHECK_BOX") {

        field.formInstanceFieldValues = []
        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          if (this.selectedFieldValues[field.formInstanceFieldId].length == 0) {
            field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, ""))
          } else {
            for (let inputValue of this.selectedFieldValues[field.formInstanceFieldId]) {
              field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, inputValue))
            }
          }
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "MULTI_DROPDOWN") {

        field.formInstanceFieldValues = []
        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          for (let inputValue of this.selectedFieldValues[field.formInstanceFieldId]) {

            field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, inputValue.formFieldOptionValue))
          }

          if (this.selectedFieldValues[field.formInstanceFieldId].length == 0) {
            field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, ""))
          }
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "SINGLE_DROPDOWN") {

        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId].formFieldOptionValue)
        }
      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "RADIO_BUTTON") {

        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId])
        }
      }
      else if (field.formFieldMapping.inputType.toString().toUpperCase() === "DATE" || field.formFieldMapping.inputType.toString().toUpperCase() === "TIME") {

        if (this.selectedFieldValues[field.formInstanceFieldId] !== undefined) {
          field.formInstanceFieldValues[0] = new FormInstanceFieldValue(undefined, this.selectedFieldValues[field.formInstanceFieldId].toString())
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
    this.confirmationService.confirm({
      header: 'Submission Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Do you want to submit this form instance?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.submitFormInstance()
      },
      reject: () => {
      }
    });

  }

  submitFormInstance() {
    this.formInstanceToData()
    this.selectedFormInstance.dateSubmitted = new Date()
    
    this.formService.submitFormInstance(this.selectedFormInstance).subscribe(
      response => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Form Instance sucessfully updated!' })
        window.location.reload();
      },
      error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
      }
    );

  }

  archive(formInstanceToArchive: FormInstance) {
    this.confirmationService.confirm({
      header: 'Submission Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Do you want to archive this form instance?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.formService.archiveFormInstance(formInstanceToArchive).subscribe(
          response => {
            this.msgForDialog = []
            this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Form Instance sucessfully archived!' })
            window.location.reload();
          },
          error => {
            this.msgForDialog = []
            this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
          }
        );
      },
      reject: () => {
      }
    });

    
  }

  archiveFormInstance() {
    
    this.formService.archiveFormInstance(this.selectedFormInstance).subscribe(
      response => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Form Instance sucessfully archived!' })
        window.location.reload();
      },
      error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
      }
    );

  }

  

  clearDialog() {
    this.msgForDialog = []
    this.selected = false
  }


  onRowSelect(event) {
    this.selected = true
    this.selectedFieldValues = {}
    this.formInstanceToView()
  }

  onRowUnselect(event) {
    this.selected = false
  }

  confirmDelete() {
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


  confirmArchive() {
    this.confirmationService.confirm({
      header: 'Submission Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Do you want to archive this form instance?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.archiveFormInstance()
      },
      reject: () => {
      }
    });
  }


}

