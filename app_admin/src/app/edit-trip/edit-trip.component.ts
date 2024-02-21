import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent {
  editForm: FormGroup = new FormGroup({
    _id: new FormGroup([]),
    code: new FormGroup([]),
    name: new FormGroup([]),
    length: new FormGroup([]),
    start: new FormGroup([]),
    resort: new FormGroup([]),
    perPerson: new FormGroup([]),
    image: new FormGroup([]),
    description: new FormGroup([]),
  });
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
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })

    this.tripService.getTrip(tripCode)
    .subscribe(data => {
      console.log(data);
      // Don't use editForm.setValue() as it will throw console error
      this.editForm.patchValue(data);
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['']);
        });
    };
  }
    // Get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}

