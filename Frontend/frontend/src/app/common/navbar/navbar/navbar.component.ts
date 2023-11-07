import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  // Constructor
  constructor(private authService: AuthService, private router: Router) {}

  // On user logout click event - Logs user out by removing auth token and redirects user to login - Session storage is also cleared to ensure no leaked usernames
  onLogoutClick(): void {
    this.authService.logout();
    sessionStorage.clear();
  }
}
