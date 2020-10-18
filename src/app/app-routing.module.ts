import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AppMainComponent } from './layout/app-main/app-main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-screen',
    pathMatch: 'full'
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./screens/login-screen/login-screen.module').then(m => m.LoginScreenComponentModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppMainComponent,
    children: [
      {
        path: 'home-screen',
        loadChildren: () => import('./screens/home-screen/home-screen.module').then(m => m.HomeScreenComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'account-screen',
        loadChildren: () => import('./screens/account-screen/account-screen.module').then(m => m.AccountScreenComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'general-eforms-screen',
        loadChildren: () => import('./screens/general-eforms-screen/general-eforms-screen.module').then(m => m.GeneralEFormsScreenComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'form-repo-screen',
        loadChildren: () => import('./screens/form-repo-screen/form-repo-screen.module').then(m => m.FormRepoScreenComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'booking-management-screen',
        loadChildren: () => import('./screens/booking-management-screen/booking-management-screen.module').then(m => m.BookingManagementScreenComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'booking-management-screen/:slotId',
        loadChildren: () => import('./screens/booking-management-screen/booking-management-screen.module').then(m => m.BookingManagementScreenComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'general-eforms-screen/:formInstanceId',
        loadChildren: () => import('./screens/general-eforms-screen/general-eforms-screen.module').then(m => m.GeneralEFormsScreenComponentModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./screens/error-screen/error-screen.module').then(m => m.ErrorScreenComponentModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }