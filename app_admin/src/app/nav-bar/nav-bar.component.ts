import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 
'../services/authentication.service';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  protected onLogout(): void {
    return this.authenticationService.logout();
  }
}
