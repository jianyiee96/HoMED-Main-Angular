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
      }
    ]
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./screens/login-screen/login-screen.module').then(m => m.LoginScreenComponentModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}