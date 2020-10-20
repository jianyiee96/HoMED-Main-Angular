import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { ConsultationScreenComponentRoutingModule } from './consultation-screen.routing.module';
import { ConsultationScreenComponent } from './consultation-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConsultationScreenComponentRoutingModule
  ],
  declarations: [ConsultationScreenComponent]
})
export class ConsultationScreenComponentModule {
  
}