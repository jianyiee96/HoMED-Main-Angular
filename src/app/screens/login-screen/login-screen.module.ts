import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { LoginScreenComponentRoutingModule } from './login-screen-routing.module';
import { LoginScreenComponent } from './login-screen.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginScreenComponentRoutingModule
  ],
  declarations: [LoginScreenComponent],

})
export class LoginScreenComponentModule {}