import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../session/session.service';




@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  

  baseUrl: string = "/api/Scheduler"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  queryBookingSlots(medicalCentreId: number, queryDate: Date): Observable<any> {
    let queryBookingSlotsReq = {
      "medicalCentreId": medicalCentreId,
      "queryDate": queryDate
    }
    return this.httpClient.post<any>(this.baseUrl + "/queryBookingSlots", queryBookingSlotsReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  scheduleBooking(servicemanId: number, consultationPurposeId: number, bookingSlotId: number, bookingComment: string): Observable<any> {
    let scheduleBookingreq = {
        "servicemanId": servicemanId,
        "consultationPurposeId": consultationPurposeId,
        "bookingSlotId": bookingSlotId,
        "bookingComment": bookingComment
    }
    return this.httpClient.post<any>(this.baseUrl + "/scheduleBooking", scheduleBookingreq, this.sessionService.getSecuredHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  cancelBooking(bookingId, cancellationComment): Observable<any> {
    let cancelBookingReq = {
        "bookingId": bookingId,
        "cancellationComment": "Something"
    }
    return this.httpClient.post<any>(this.baseUrl + "/cancelBooking", cancelBookingReq, this.sessionService.getSecuredHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }  

  retrieveAllServicemanBookings(): Observable<any> {

    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanBookings?servicemanId=" + 
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
