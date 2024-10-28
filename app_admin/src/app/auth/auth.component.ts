import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  public isRegistering: boolean = false;

  public toggleRegisterMode(): void {
    this.isRegistering = !this.isRegistering;
  }
}
