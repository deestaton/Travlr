import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Trip } from '../models/trip';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api/';

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.log('Something has gone wrong', error); // for demo purposes only
    return throwError(() => new Error('Please try again'));
  }
}
