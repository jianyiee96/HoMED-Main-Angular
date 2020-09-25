import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralEFormsScreenComponent } from './general-eforms-screen.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralEFormsScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralEFormsScreenComponentRoutingModule {}