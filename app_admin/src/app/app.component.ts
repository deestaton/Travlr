import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripDataService } from './services/trip-data.service';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        TripListingComponent,
        TripCardComponent,
        AddTripComponent,
        EditTripComponent,
        NavBarComponent,
        ReactiveFormsModule,
    ],
    providers: [
        TripDataService,
        FormsModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Traveler Admin';
}
