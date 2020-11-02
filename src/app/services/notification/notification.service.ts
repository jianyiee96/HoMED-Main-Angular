import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl: string = "/api/Notification"

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  retrieveAllServicemanNotifications() {
    return this.httpClient.get<any>(this.baseUrl + "/retrieveAllServicemanNotifications?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, 
    this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  hasUnfetchedNotifications() {
    return this.httpClient.get<any>(this.baseUrl + "/hasUnfetchedNotifications?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  readNotification(notificationId: number) {
    let readNotificationReq = {
      "notificationId": notificationId
    }

    return this.httpClient.post<any>(this.baseUrl + "/readNotification", readNotificationReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    )
  }

  readAllNotifications() {
    let readAllNotificationsReq = {
      "servicemanId": this.sessionService.getCurrentServiceman().servicemanId
    }

    return this.httpClient.post<any>(this.baseUrl + "/readAllNotifications", readAllNotificationsReq, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    )
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/deleteNotification?notificationId=" + notificationId, this.sessionService.getSecuredHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteAllNotifications(): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + "/deleteAllNotification?servicemanId=" + this.sessionService.getCurrentServiceman().servicemanId, this.sessionService.getSecuredHttpOptions()).pipe(
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
