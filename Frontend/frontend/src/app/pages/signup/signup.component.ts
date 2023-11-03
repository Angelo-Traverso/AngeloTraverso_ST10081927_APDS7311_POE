import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

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

    if (this.password.value != this.confirmPassword.value) {
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.http.post('https://localhost:3000/api/users', {
      username: this.username.value,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      contactNumber: this.contactNumber.value,
      password: this.password.value
    }, {
      responseType: 'text'
    }).subscribe({
      next: (v) => {
        if (v === 'Created') {
          this.router.navigate(['/login']);
        } else {
          this.hasError = true;
          this.errorMessage = 'Unexpected response: ' + v;
        }
      },
      error: (err) => {
        this.hasError = true;
        this.errorMessage = 'Error creating account, please check your details';
      },
    });
  }
}
