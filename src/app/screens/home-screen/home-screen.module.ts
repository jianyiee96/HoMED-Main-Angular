import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { HomeScreenComponentRoutingModule } from './home-screen-routing.module';
import { HomeScreenComponent } from './home-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeScreenComponentRoutingModule
  ],
  declarations: [HomeScreenComponent]
})
export class HomeScreenComponentModule {}