import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 
'../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      console.log("Login successful");
      this.doLogin()
    }
  }

  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .subscribe(
        () => this.router.navigateByUrl('list-trips'),
        (error: any) => this.formError = error.message);
  }
}
