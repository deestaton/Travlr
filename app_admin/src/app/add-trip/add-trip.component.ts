import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',
  providers: []
})

export class AddTripComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private http: HttpClient
  ) {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.addForm = this.formBuilder.group({
    //   _id: [],
    //   code: ['', Validators.required],
    //   name: ['', Validators.required],
    //   length: ['', Validators.required],
    //   start: ['', Validators.required],
    //   resort: ['', Validators.required],
    //   perPerson: ['', Validators.required],
    //   image: ['', Validators.required],
    //   description: ['', Validators.required],
    // });
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['']);
        });
    };
  }
    // Get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}


