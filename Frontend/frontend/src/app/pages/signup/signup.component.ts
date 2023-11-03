import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export default class SignupComponent implements OnInit {
  username = new FormControl('');
  firstname = new FormControl('');
  lastname = new FormControl('');
  email = new FormControl('');
  contactNumber = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void { }


  onSubmit(e: Event) {
    e.preventDefault();
    this.hasError = false;

    console.log(this.username.value, this.firstname.value, this.lastname.value, this.email.value, this.contactNumber.value, this.password.value, this.confirmPassword.value)
    if (
      !this.username.value ||
      !this.firstname.value ||
      !this.lastname.value ||
      !this.email.value ||
      !this.contactNumber.value ||
      !this.password.value ||
      !this.confirmPassword.value

    ) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    // Check if password match
    if (this.password.value != this.confirmPassword.value) {
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Send http request ot create user
    this.auth.signUp(
      this.username.value,
      this.firstname.value,
      this.lastname.value,
      this.email.value,
      this.contactNumber.value,
      this.password.value
    )
    .subscribe({
      
      next: (v) => {
        console.log('Token received:', v);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Error signing up:', err);
        this.hasError = true;
        this.errorMessage = 'Error creating acccount, please check your details';
      },
    });

  }

}
