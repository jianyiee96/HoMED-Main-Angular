import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { GeneralEFormsScreenComponentRoutingModule } from './general-eforms-screen-routing.module';
import { GeneralEFormsScreenComponent } from './general-eforms-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralEFormsScreenComponentRoutingModule
  ],
  declarations: [GeneralEFormsScreenComponent],

})
export class GeneralEFormsScreenComponentModule {}