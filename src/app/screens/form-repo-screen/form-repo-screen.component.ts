import { Component, OnInit } from '@angular/core';

import {BreadcrumbService} from '../../services/breadcrum.service';
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/services/form/form.service';
import { FormTemplate } from 'src/app/classes/formtemplate/formtemplate';
import { SessionService } from 'src/app/services/session/session.service'
import { FormField } from 'src/app/classes/formfield/formfield';

@Component({
  selector: 'app-form-repo-screen',
  templateUrl: './form-repo-screen.component.html',
  styleUrls: ['./form-repo-screen.component.css'],
  providers: [MessageService]
})
export class FormRepoScreenComponent implements OnInit {
  
  
  formTemplates: FormTemplate[]
  selectedTemplate: FormTemplate
  selected: boolean
  tempFormFields: FormField[]


  constructor(private breadcrumbService: BreadcrumbService, private formService: FormService, private sessionService: SessionService,
              private service: MessageService
  ) { 
    this.breadcrumbService.setItems([
      {label: 'eForm Management'},
      {label: 'General eForms', routerLink: ['/general-eforms-screen']},
      {label: 'Form Repo', routerLink: ['/form-repo-screen']}
    ]);
    
  }

  ngOnInit() {

    this.formService.retrieveAllFormTemplates().subscribe(
      response => {
        this.formTemplates = response.formTemplates
        this.selected = false
      
      },
      error => {
				console.log(error.substring(32))
			}
    );
    
  }


  createFormInstance() {
    this.formService.createFormInstance(this.sessionService.getCurrentServiceman().servicemanId, this.selectedTemplate.formTemplateId).subscribe(
      response => {  
        console.log("Success") 
        this.service.add({ key: 'tst', severity: 'success', summary: '', detail: 'Form Instance Created Successfully' });
      },
      error => {
				console.log(error.substring(32))
			}
    );
  }

  onRowSelect(event) { 
    this.tempFormFields = []
    this.selected = true
    this.selectedTemplate.datePublished= this.parseDate(this.selectedTemplate.datePublished).substring(0,10)
    let index = 1
    console.log(this.selectedTemplate.formFields)
    for (var i = 0; i < this.selectedTemplate.formFields.length; i++) {
      for (let formField of this.selectedTemplate.formFields) {
        if (formField.position === index) {
          this.tempFormFields.push(formField);
          index++;
          break;
        }
      }
    }
    this.selectedTemplate.formFields = this.tempFormFields;
  }
   

  onRowUnselect(event) {
    this.selected = false
  }

  parseDate(date: any) {
    return date.toString().replace('[UTC]', '');
  }

}