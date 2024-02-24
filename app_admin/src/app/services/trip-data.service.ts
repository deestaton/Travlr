import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    return this.http
      .post<Trip>(this.tripUrl, formData, { headers: headers }) // pass form data in request body
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData, { headers: headers })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  public deleteTrip(formData: Trip): Observable<any> {
    console.log('Inside TripDataService#deleteTrip');
    console.log(formData);
    return this.http
      .delete<Trip>(this.tripUrl + formData.code)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<never> {
    console.log('Something has gone wrong', error); // for demo purposes only
    return throwError(() => new Error('Please try again'));
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  public makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(
        map(response => response as AuthResponse),
        catchError(this.handleError)
      );
  }
}
