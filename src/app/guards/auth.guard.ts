import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Serviceman } from '../classes/serviceman/serviceman';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(
    private router: Router,
    private sessionService: SessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    try {

      if (next.url[0].path == "login-screen") { 

        if (this.sessionService.getIsLogin()) { 
          this.router.navigate(['/home-screen']); 
        } else { 
          return true;
        }

      } else {
        if (this.sessionService.getIsLogin()) { 
          return true;
        } else {
          this.router.navigate(['/login-screen']);
        }
      }

    } catch (error) {
      if (this.sessionService.getIsLogin()) { 
        return true;
      } else {
        this.router.navigate(['/login-screen']);
      }
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
