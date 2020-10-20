import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationScreenComponent } from './consultation-screen.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultationScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationScreenComponentRoutingModule {}