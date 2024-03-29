import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  retrieveAllFormTemplates(): Observable<any> {
    console.log(this.sessionService.getSecuredHttpOptions())
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllFormTemplates", this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    )
  }


  retrieveAllServicemanFormInstances(): Observable<any> {
    console.log(this.sessionService.getSecuredHttpOptions())
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanFormInstances?servicemanId=" + 
    this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }


  createFormInstance(servicemanId: number, formTemplateId: number): Observable<any> {
    let createFormInstanceReq = {
      "servicemanId": servicemanId,
      "formTemplateId": formTemplateId
    }
    return this.httpClient.post<any>(this.baseUrl + "/createFormInstance", createFormInstanceReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }


  updateFormInstanceFieldValues(formInstanceToUpdate: FormInstance): Observable<any> {
    let UpdateFormInstanceReq  = {
      "formInstance": formInstanceToUpdate
    }
    return this.httpClient.post<any>(this.baseUrl + "/updateFormInstanceFieldValues", UpdateFormInstanceReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }


  deleteFormInstance(formInstanceId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/deleteFormInstance?formInstanceId=" + formInstanceId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }
  
  submitFormInstance(formInstanceToSubmit: FormInstance): Observable<any> {
    let submitFormInstanceReq  = {
      "formInstance": formInstanceToSubmit
    }
    return this.httpClient.post<any>(this.baseUrl + "/submitFormInstance", submitFormInstanceReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  archiveFormInstance(formInstanceToArchive: FormInstance): Observable<any> {
    let archiveFormInstanceReq  = {
      "formInstance": formInstanceToArchive
    }
    return this.httpClient.post<any>(this.baseUrl + "/archiveFormInstance", archiveFormInstanceReq, this.sessionService.getSecuredHttpOptions()).pipe(
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