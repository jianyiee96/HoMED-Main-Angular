import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingManagementScreenComponent } from './booking-management-screen.component';

const routes: Routes = [
  {
    path: '',
    component: BookingManagementScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingManagementScreenComponentRoutingModule {}