import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicemanService {

  baseUrl: string = "/api/Serviceman"

  constructor(private httpClient: HttpClient) {}

  login(nric: string, password: string): Observable<any> {
    let loginReq = {
      "nric": nric,
      "password": password
    }

    return this.httpClient.post<any>(this.baseUrl + "/login", loginReq).pipe(
      catchError(this.handleError)
    )
  }

  changePassword(nric: string, oldPassword: string, newPassword: string) {
    let changePasswordReq = {
      "nric": nric,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }
    return this.httpClient.post<any>(this.baseUrl + "/changePassword", changePasswordReq).pipe(
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
