import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRepoScreenComponent } from './form-repo-screen.component';

const routes: Routes = [
  {
    path: '',
    component: FormRepoScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRepoScreenComponentRoutingModule {}