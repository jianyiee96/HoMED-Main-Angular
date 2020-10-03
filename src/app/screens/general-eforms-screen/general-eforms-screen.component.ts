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
import { DatePipe } from '@angular/common';
import { skip } from 'rxjs/operators';


@Component({
  selector: 'app-general-eforms-screen',
  templateUrl: './general-eforms-screen.component.html',
  styleUrls: ['./general-eforms-screen.component.css'],
  providers: [MessageService]

})
export class GeneralEFormsScreenComponent implements OnInit {

  formInstances: FormInstance[]
  selectedFormInstance: FormInstance
  testDate: Date

  selectedFieldValues: { [id: number]: any } = {}
  failedValidationFieldMappingId: Set<number> = new Set()

  archiveMode: boolean

  msgForDialog: Message[] = []
  selected: boolean

  containDraftForms: boolean
  containArchiveForms: boolean

  acceptDeclaration: boolean
  declarationValidationError: boolean

  constructor(private breadcrumbService: BreadcrumbService, private formService: FormService,
    private service: MessageService, private confirmationService: ConfirmationService
  ) {
    this.breadcrumbService.setItems([
      { label: 'eForm Management' },
      { label: 'General eForms', routerLink: ['/general-eforms-screen'] }
    ]);
  }

  ngOnInit() {
    this.containDraftForms = false
    this.containArchiveForms = false
    this.archiveMode = false
    this.failedValidationFieldMappingId = new Set()
    this.formService.retrieveAllServicemanFormInstances().subscribe(
      response => {
        this.formInstances = response.formInstances
        for (let formInstance of this.formInstances) {
          if (formInstance.formInstanceStatusEnum.toString() === 'ARCHIVED') {
            this.containArchiveForms = true
          }
          if (formInstance.formInstanceStatusEnum.toString() === 'DRAFT' || formInstance.formInstanceStatusEnum.toString() === 'SUBMITTED') {
            this.containDraftForms = true
          }
          let date1 = this.convertUTCStringToSingaporeDate(formInstance.dateCreated);
          formInstance.dateCreated = date1
          let date2 = this.convertUTCStringToSingaporeDate(formInstance.dateSubmitted)
          formInstance.dateSubmitted = date2
        }
      },
      error => {
        console.log(error.substring(32));
      }
    );

  }



  // Process FormInstanceFields into String[]
  formInstanceToView() {
    this.selectedFieldValues = {}
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
          if (fieldValue.inputValue === "") {
            continue;
          }
          this.selectedFieldValues[field.formInstanceFieldId].push(fieldValue.inputValue)
        }

        if (this.selectedFieldValues[field.formInstanceFieldId].length === 0) {
          this.selectedFieldValues[field.formInstanceFieldId].push("")
        }

      } else if (field.formFieldMapping.inputType.toString().toUpperCase() === "MULTI_DROPDOWN") {

        this.selectedFieldValues[field.formInstanceFieldId] = []

        for (let fieldValue of field.formInstanceFieldValues) {
          if (fieldValue.inputValue !== "") {
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
          if (this.selectedFieldValues[field.formInstanceFieldId][0] === "" && this.selectedFieldValues[field.formInstanceFieldId].length > 1) {
            this.selectedFieldValues[field.formInstanceFieldId].shift()
          }

          for (let inputValue of this.selectedFieldValues[field.formInstanceFieldId]) {
            field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, inputValue))
          }
          if (this.selectedFieldValues[field.formInstanceFieldId].length == 0) {
            field.formInstanceFieldValues.push(new FormInstanceFieldValue(undefined, ""))
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

  convertUTCStringToSingaporeDate(dateCreated) {

    if (dateCreated != null) {
      let stringUtcTime = dateCreated.toLocaleString().substring(0, 19)
      return new Date(Date.UTC(
        parseInt(stringUtcTime.substring(0, 4)),
        parseInt("" + (+stringUtcTime.substring(5, 7) - 1)),
        parseInt(stringUtcTime.substring(8, 10)),
        parseInt(stringUtcTime.substring(11, 13)),
        parseInt(stringUtcTime.substring(14, 16)),
        parseInt(stringUtcTime.substring(17, 19))));
    }
  }

  seek(list: FormFieldOption[], option: FormFieldOption) {
    list.forEach(ffo => {
      if (ffo.formFieldOptionValue == option.formFieldOptionValue) {
        return true
      }
    })
    return false
  }

  updateFormInstance() {
    this.formInstanceToData()
    this.failedValidationFieldMappingId = new Set()
    this.formService.updateFormInstanceFieldValues(this.selectedFormInstance).subscribe(
      response => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'success', summary: '', detail: 'Form Instance Field Values Updated!' })
        window.scrollTo(0, 0)
      },
      error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
      }
    );

  }

  updateFormInstanceBySubmit() {
    this.formInstanceToData()
    this.failedValidationFieldMappingId = new Set()
    this.formService.updateFormInstanceFieldValues(this.selectedFormInstance).subscribe(
      response => {
      },
      error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
      }
    );

  }


  deleteFormInstance() {
    this.failedValidationFieldMappingId = new Set()
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
    this.formInstanceToData()
    this.failedValidationFieldMappingId = new Set()
    this.msgForDialog = []
    let passValidation = this.validateFormFieldInputs()
    if (passValidation) {
      this.failedValidationFieldMappingId = new Set()
      this.confirmationService.confirm({
        header: 'Submission Confirmation',
        icon: 'pi pi-exclamation-triangle',
        message: 'Do you want to save and submit this form instance?',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.submitFormInstance()
        },
        reject: () => {
        }
      });

    } else {
      console.log("Input field validation error")
    }
  }

  validateFormFieldInputs() {
    let success = true

    this.selectedFormInstance.formInstanceFields.forEach(instanceField => {


      let requireValidate = instanceField.formFieldMapping.isRequired
        && instanceField.formFieldMapping.isServicemanEditable
        && instanceField.formFieldMapping.inputType.toString().toUpperCase() !== "HEADER"

      if (requireValidate) {
        let hasInput = false

        instanceField.formInstanceFieldValues.forEach(instanceFieldValue => {
          if (instanceFieldValue.inputValue != null && instanceFieldValue.inputValue != "") {
            hasInput = true
          }
        });

        if (!hasInput) {
          this.failedValidationFieldMappingId.add(instanceField.formFieldMapping.formFieldId)
          success = false
        }

      }

    });

    if(!this.acceptDeclaration && this.selectedFormInstance.formTemplateMapping.declaration != null){
      this.declarationValidationError = true
      success = false
    } else {
      this.declarationValidationError = false
    }

    return success;
  }

  submitFormInstance() {
    this.formService.submitFormInstance(this.selectedFormInstance).subscribe(
      response => {
        this.clearDialog()
        this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Form Instance Submitted Successfully' });
        this.ngOnInit()
      },
      error => {
        this.msgForDialog = []
        this.msgForDialog.push({ severity: 'error', summary: '', detail: error.substring(32) })
      }
    );

  }

  archive(formInstanceToArchive: FormInstance) {
    this.confirmationService.confirm({
      header: 'Archive Confirmation',
      icon: 'pi pi-exclamation-triangle',
      message: 'Do you want to archive this form instance?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.formService.archiveFormInstance(formInstanceToArchive).subscribe(
          response => {
            this.clearDialog()
            this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Form Instance Archived Successfully' });
            this.ngOnInit()
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
        this.clearDialog()
        this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Form Instance Archived Successfully' });
        this.ngOnInit()
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
    this.selectedFieldValues = {}
  }


  onRowSelect(event) {
    this.msgForDialog = []
    this.failedValidationFieldMappingId = new Set()
    this.selected = true
    this.selectedFieldValues = {}
    this.acceptDeclaration = false
    this.declarationValidationError = false
    this.formInstanceToView()
  }

  onRowUnselect(event) {
    this.msgForDialog = []
    this.failedValidationFieldMappingId = new Set()
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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  viewArchive() {
    this.selected = false
    this.archiveMode = true
  }

  unviewArchive() {
    this.selected = false
    this.archiveMode = false
  }

}


