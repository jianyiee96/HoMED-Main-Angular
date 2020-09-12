import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';


const routes: Routes = [
  { path: '', redirectTo: '/login-screen', pathMatch: "full" },
  { path: "login-screen", component: LoginScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
