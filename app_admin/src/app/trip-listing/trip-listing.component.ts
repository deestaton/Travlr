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

import { Component } from '@angular/core';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
})
export class TripListingComponent {
  trips: Trip[] | undefined;
  message = 'Searching for trips';
  ngOnDestroy: (() => void) | undefined;

  constructor(private tripDataService: TripDataService) {}

  async ngOnInit() {
    try {
      const foundTrips = await this.tripDataService.getTrips()
        .pipe(
          catchError(error => {
            console.error('Error fetching trips:', error);
            this.message = 'An error occurred. Please try again.';
            return throwError(() => new Error('Error fetching trips'));
          })
        )
        .subscribe(trips => {
          this.trips = trips;
          this.message = trips.length > 0 ? '' : 'No trips found';
        });

        // Unsubscribe when the component is destroyed to avoid memory leaks
        this.ngOnDestroy = () => foundTrips.unsubscribe();
    } catch (error) {
      console.log('An error occurred: ', error);
    }
  }
}
