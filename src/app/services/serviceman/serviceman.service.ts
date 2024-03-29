import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Serviceman } from 'src/app/classes/serviceman/serviceman';
import { SessionService } from '../session/session.service';




@Injectable({
  providedIn: 'root'
})
export class ServicemanService {
  

  baseUrl: string = "/api/Serviceman"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  

  login(email: string, password: string): Observable<any> {
    let loginReq = {
      "email": email,
      "password": password
    }
    
    return this.httpClient.post<any>(this.baseUrl + "/login", loginReq, this.httpOptions).pipe(
      catchError(this.handleError)
    )
    
    
  }
  
  activateAccount(email: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    let activateAccountReq = {
      "email": email,
      "newPassword": newPassword,
      "confirmNewPassword" : confirmNewPassword
    }
    return this.httpClient.post<any>(this.baseUrl + "/activateAccount", activateAccountReq, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  changePassword(email: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    let changePasswordReq = {
      "email": email,
      "oldPassword": oldPassword,
      "newPassword": newPassword,
      "confirmNewPassword" : confirmNewPassword
    }
    
    
    return this.httpClient.post<any>(this.baseUrl + "/changePassword", changePasswordReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(email: string, phoneNumber: string): Observable<any> {
    let resetPasswordReq = {
      "email": email,
      "phoneNumber": phoneNumber
    }

    return this.httpClient.post<any>(this.baseUrl + "/resetPassword", resetPasswordReq, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  

  updateAccount(accountToUpdate: Serviceman): Observable<any> {
    let updateAccountReq = {
      "serviceman": accountToUpdate
    }


    return this.httpClient.post<any>(this.baseUrl + "/updateServiceman", updateAccountReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  retrieveServicemanDetails(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveServicemanDetails?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error.message;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
}
