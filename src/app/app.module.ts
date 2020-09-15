import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { AppTopbarComponent } from './layout/app-topbar/app-topbar.component';
import { AppNavbarComponent } from './layout/app-navbar/app-navbar.component';
import { AppBreadcrumbComponent } from './layout/app-breadcrumb/app-breadcrumb.component';
import { AppMainComponent } from './layout/app-main/app-main.component';



@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppTopbarComponent,
    AppNavbarComponent,
    AppBreadcrumbComponent,
    AppMainComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
