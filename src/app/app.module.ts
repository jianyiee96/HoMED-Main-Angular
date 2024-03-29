import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { AppTopbarComponent } from './layout/app-topbar/app-topbar.component';
import { AppMenuComponent } from './layout/app-menu/app-menu.component';
import { AppBreadcrumbComponent } from './layout/app-breadcrumb/app-breadcrumb.component';
import { AppMainComponent } from './layout/app-main/app-main.component';
import { AppMenuitemComponent } from './layout/app-menu/app.menuitem.component';
import { SharedModule } from './shared.module';

import { BreadcrumbService } from './services/breadcrum.service';
import { MenuService } from './services/app.menu.service';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpConfigInterceptor } from './interceptors/http.config.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppTopbarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppBreadcrumbComponent,
    AppMainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    BreadcrumbService,
    MenuService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
