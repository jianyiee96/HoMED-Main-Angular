import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalReviewScreenRoutingModule } from './medical-review-screen-routing.module';
import { MedicalReviewScreenComponent } from './medical-review-screen.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [MedicalReviewScreenComponent],
  imports: [
    CommonModule,
    SharedModule,
    MedicalReviewScreenRoutingModule
  ]
})
export class MedicalReviewScreenModule { }
