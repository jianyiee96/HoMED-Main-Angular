import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

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
    path: 'home-screen', 
    loadChildren: () => import('./screens/home-screen/home-screen.module').then(m => m. HomeScreenComponentModule),
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
