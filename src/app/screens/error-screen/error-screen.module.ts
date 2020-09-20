import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { ErrorScreenComponentRoutingModule } from './error-screen.routing.module';
import { ErrorScreenComponent } from './error-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ErrorScreenComponentRoutingModule
  ],
  declarations: [ErrorScreenComponent]
})
export class ErrorScreenComponentModule {}