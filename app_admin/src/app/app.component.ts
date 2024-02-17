import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripDataService } from './services/trip-data.service';
import { AddTripComponent } from './add-trip/add-trip.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TripListingComponent, 
    TripCardComponent,
    AddTripComponent,
    HttpClientModule,
  ],
  providers: [
    TripDataService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Traveler Admin';
}
