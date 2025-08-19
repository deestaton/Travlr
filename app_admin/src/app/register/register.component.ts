import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';


@Component({
    selector: 'app-register',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, LoginComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

  // Registration form
  public registerForm: FormGroup;
  public formError: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.createForms();
  }

  private createForms(): void {
    // Registration form initialization
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('/^[a-zA-Z0-9_]+$/')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator for password matching
  private passwordMatchValidator(group: FormGroup) {
    return group.get('password')?.value === group.get('passwordConfirm')?.value
    ? null : { 'mismatch': true };
  }


  public onRegisterSubmit(): void {
    this.formError = '';
    if (this.registerForm.valid) {
      if (this.registerForm.hasError('mismatch')) {
        this.formError = 'Passwords do not match';
        return;
      }

      const registration = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        passwordConfirm: this.registerForm.get('passwordConfirm')?.value
      };

      this.doRegister(registration);
    } else {
      this.formError = 'Please complete all fields correctly';
    }
  }


  private doRegister(registration: any): void {
    this.authenticationService.register(registration)
      .subscribe({
        next: () => {
          // Auto-login after successful registration
          doLogin({
            email: registration.email,
            password: registration.password
          });
        },
        error: (error: any) => {
          this.formError = error.error?.message || 'An error occured during registration';
        }
      });
  }

  // Form gettings for template use
  get registerUsername() { return this.registerForm.get('username'); }
  get registerEmail() { return this.registerForm.get('email'); }
  get registerPassword() { return this.registerForm.get('password'); }
  get registerPasswordConfirm() { return this.registerForm.get('passwordConfirm'); }

}
function doLogin(arg0: { email: any; password: any; }) {
  throw new Error('Function not implemented.');
}

