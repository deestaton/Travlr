import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from "../trip-card/trip-card.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-trip-listing',
    standalone: true,
    templateUrl: './trip-listing.component.html',
    styleUrl: './trip-listing.component.css',
    imports: [TripCardComponent, CommonModule],
    providers: [TripDataService]
})
export class TripListingComponent implements OnInit {

  trips: Trip[];
  message = 'Searching for trips';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
    ) {}

  protected addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
  }

  deleteTrip(): void {
    console.log('Inside TripListingComponent#deleteTrip');
    this.router.navigate(['delete-trip']);
  }

  ngOnInit() {
    try {
      this.tripDataService.getTrips().subscribe(trips => {
        this.trips = trips;
        this.message = this.trips.length > 0 ? '' : 'Mo trips found';
      });
    } catch (error) {
      console.log('An error occurred: ', error);
      this.message = 'An error occurred. Please try again.';
    }
  }
}
