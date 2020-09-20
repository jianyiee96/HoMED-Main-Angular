import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { AccountScreenComponentRoutingModule } from './account-screen-routing.module';
import { AccountScreenComponent } from './account-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountScreenComponentRoutingModule
  ],
  declarations: [AccountScreenComponent]
})
export class AccountScreenComponentModule {}