import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { HomeScreenComponentRoutingModule } from './home-screen-routing.module';
import { HomeScreenComponent } from './home-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeScreenComponentRoutingModule,
    FontAwesomeModule
  ],
  declarations: [HomeScreenComponent]
})
export class HomeScreenComponentModule {}