import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Serviceman } from '../../classes/serviceman/serviceman'
import { SessionService } from '../session/session.service'
import { FormInstance } from '../../classes/forminstance/forminstance'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {
  

  baseUrl: string = "/api/Form"

  constructor(private httpClient: HttpClient, private serviceman: Serviceman, private formInstance: FormInstance,
    private sessionService: SessionService) {}

  retrieveAllFormTemplates(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllFormTemplates", httpOptions).pipe(
      catchError(this.handleError)
    )
  }


  retrieveAllServicemanFormInstances(): Observable<any> {

    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanFormInstances?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId).pipe(
      catchError(this.handleError)
    );
  }


  createFormInstance(servicemanId: number, formTemplateId: number): Observable<any> {
    let createFormInstanceReq = {
      "servicemanId": servicemanId,
      "formTemplateId": formTemplateId
    }
    return this.httpClient.post<any>(this.baseUrl + "/createFormInstance", createFormInstanceReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  updateFormInstanceFieldValues(formInstanceToUpdate: FormInstance): Observable<any> {
    let UpdateFormInstanceReq  = {
      "formInstance": formInstanceToUpdate
    }
    return this.httpClient.post<any>(this.baseUrl + "/updateFormInstanceFieldValues", UpdateFormInstanceReq, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  deleteFormInstance(): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/deleteFormInstance?formInstanceId=" + this.formInstance.formInstanceId).pipe(
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
