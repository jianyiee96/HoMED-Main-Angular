import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalReviewScreenComponent } from './medical-review-screen.component';

const routes: Routes = [
  {
    path: '',
    component: MedicalReviewScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalReviewScreenRoutingModule { }
