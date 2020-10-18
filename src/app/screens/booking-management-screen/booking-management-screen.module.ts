import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { BookingManagementScreenComponentRoutingModule } from './booking-management-screen-routing.module';
import { BookingManagementScreenComponent } from './booking-management-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookingManagementScreenComponentRoutingModule
  ],
  declarations: [BookingManagementScreenComponent]
})
export class BookingManagementScreenComponentModule {}