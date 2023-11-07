import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  constructor(private authService: AuthService, private router: Router) {}

  onLogoutClick(): void {
    this.authService.logout(); // Call the AuthService's logout method
    sessionStorage.clear();
  }

  onAddPostClick(): void {
    // Navigate to the "Add Post" page
    this.router.navigate(['/add-post']);
  }
}
