import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formError: string = '';
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.createForms();
  }


  private createForms(): void {
    // Login form initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public onLoginSubmit(): void {
    this.formError = '';
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.doLogin(credentials);
    } else {
      this.formError = 'Something went wrong. Please check your email and password.';
    }
  }


  private doLogin(credentials: any): void {
    this.authenticationService.login(credentials)
      .subscribe({
        next: () => this.router.navigateByUrl('list-trips'),
        error: (error: any) => {
          this.formError = error.error?.message || 'An error occured during login';
        }
      });
  }


  // Form getters for template use
  get loginEmail() { return this.loginForm.get('email'); }
  get loginPassword() { return this.loginForm.get('password'); }
}
