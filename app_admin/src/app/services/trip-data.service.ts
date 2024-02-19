import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})


export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  constructor(private http: HttpClient) { }

  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .post<Trip>(this.tripUrl, formData) // pass form data in request body
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  public getTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get<Trip>(this.tripUrl + tripCode)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(this.tripUrl)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<never> {
    console.log('Something has gone wrong', error); // for demo purposes only
    return throwError(() => new Error('Please try again'));
  }
}
