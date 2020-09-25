import { Component, OnInit } from '@angular/core';

import {BreadcrumbService} from '../../services/breadcrum.service';
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/services/form/form.service';
import { FormTemplate } from 'src/app/classes/formtemplate/formtemplate';

@Component({
  selector: 'app-form-repo-screen',
  templateUrl: './form-repo-screen.component.html',
  styleUrls: ['./form-repo-screen.component.css'],
  providers: [MessageService]
})
export class FormRepoScreenComponent implements OnInit {
  
  formTemplates: FormTemplate[]
  selectedTemplate: FormTemplate

  constructor(private breadcrumbService: BreadcrumbService, private formService: FormService) { 
    this.breadcrumbService.setItems([
      {label: 'eForm Management'},
      {label: 'General eForms'},
      {label: 'Form Repo', routerLink: ['form-repo-screen']}
    ]);
    
  }

  ngOnInit(): void {
    this.formService.retrieveAllFormTemplates().subscribe(
      response => {
        this.formTemplates = response.formTemplates
        console.log(this.formTemplates)
        console.log(response)
      }
    )
    
  }

}
