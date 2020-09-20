import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountScreenComponent } from './account-screen.component';

const routes: Routes = [
  {
    path: '',
    component: AccountScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountScreenComponentRoutingModule {}