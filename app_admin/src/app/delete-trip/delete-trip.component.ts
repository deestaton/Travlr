import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';


@Component({
    selector: 'app-delete-trip',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './delete-trip.component.html',
    styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent {

    deleteForm: FormGroup;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private tripService: TripDataService
    ) {}

    ngOnInit() {
      // retrieve stashed tripId
      let tripCode = localStorage.getItem("tripCode");
      if (!tripCode) {
        alert("Something is wrong; I couldn't find where I stashed the tripCode!");
        this.router.navigate(['']);
        return;
      }
  
      // initialize form
      this.deleteForm = this.formBuilder.group({
        _id: [],
        code: ['', Validators.required]
      })
  
      this.tripService.getTrip(tripCode)
      .subscribe(data => {
        console.log(data);
      });
    }
  
    onSubmit() {
      this.submitted = true;
      if(this.deleteForm.valid) {
        this.tripService.deleteTrip(this.deleteForm.value)
          .subscribe((data) => {
            console.log(data);
            this.router.navigate(['']);
          });
      };
    }
      // Get the form short name to access the form fields
    get f() { return this.deleteForm.controls; }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

