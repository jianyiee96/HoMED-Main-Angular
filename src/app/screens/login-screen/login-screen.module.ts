import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginScreenComponentRoutingModule } from './login-screen-routing.module';

import { LoginScreenComponent } from './login-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    LoginScreenComponentRoutingModule
  ],
  declarations: [LoginScreenComponent]
})
export class LoginScreenComponentModule {}