import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SessionService } from 'src/app/services/session/session.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        private sessionService?: SessionService,
        private router?: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(

            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                if (error.error.message.toLowerCase().includes("json")) {
                    this.logout();
                }

                return throwError(error)
            }));

    }


    logout() {
        this.sessionService.setIsLogin(false);
        this.sessionService.setCurrentServiceman(null);
        this.router.navigate(["/login-screen"]);
    }

}



