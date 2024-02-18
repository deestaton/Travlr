// import { Component, OnInit } from '@angular/core';
// // import { trips } from '../data/trips';
// import { CommonModule } from '@angular/common';
// // import { TripCardComponent } from '../trip-card/trip-card.component';
// import { TripDataService } from '../services/trip-data.service';
// import { Trip } from '../models/trip';

// @Component({
//   selector: 'app-trip-listing',
//   standalone: true,
//   templateUrl: './trip-listing.component.html',
//   styleUrl: './trip-listing.component.css',
// })
// export class TripListingComponent implements OnInit {
//   // trips: Array<any> = trips;
//   trips: Trip[] | undefined;

//   message: 'Searching for trips';

//   constructor(private tripDataService: TripDataService) {}

//   private getTrips(): void {
//     console.log('Inside TripListingComponent#getTrips');
//     this.message = "Searching for trips";
//     this.tripDataService
//       .getTrips()
//       .then(foundTrips => {
//         this.message = foundTrips.length > 0 ? '' : 'No trips found';
//         this.trips = foundTrips;
//       });
//   }

//   ngOnInit(): void {
//     this.getTrips();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
// import { trips } from '../data/trips';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from "../trip-card/trip-card.component";
import { catchError, throwError } from 'rxjs';
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
  trips: Trip[] | undefined;
  message = 'Searching for trips';
  // ngOnDestroy: (() => void) | undefined;

  constructor(
    private tripDataService: TripDataService,
    private router: Router
    ) {}

  addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
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
