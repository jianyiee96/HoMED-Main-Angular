import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalReviewService {
  baseUrl: string = "/api/MedicalBoard"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  retrieveAllServicemanStatuses(): Observable<any> {
    console.log(this.sessionService.getSecuredHttpOptions())
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanStatuses?servicemanId=" + 
    this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  retrieveAllServicemanMedicalBoardCases(): Observable<any> {
    console.log(this.sessionService.getSecuredHttpOptions())
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanMedicalBoardCases?servicemanId=" + 
    this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
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
