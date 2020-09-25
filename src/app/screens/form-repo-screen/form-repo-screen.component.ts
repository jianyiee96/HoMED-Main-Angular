import { Component, OnInit } from '@angular/core';

import {BreadcrumbService} from '../../services/breadcrum.service';

@Component({
  selector: 'app-form-repo-screen',
  templateUrl: './form-repo-screen.component.html',
  styleUrls: ['./form-repo-screen.component.css']
})
export class FormRepoScreenComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      {label: 'eForm Management'},
      {label: 'General eForms'},
      {label: 'Form Repo', routerLink: ['form-repo-screen']}
    ]);
  }

  ngOnInit(): void {
  }

}
