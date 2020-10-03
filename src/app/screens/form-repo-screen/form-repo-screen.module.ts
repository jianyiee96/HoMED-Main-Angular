import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { FormRepoScreenComponentRoutingModule } from './form-repo-screen-routing.module';
import { FormRepoScreenComponent } from './form-repo-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormRepoScreenComponentRoutingModule
  ],
  declarations: [FormRepoScreenComponent],

})
export class FormRepoScreenComponentModule {}