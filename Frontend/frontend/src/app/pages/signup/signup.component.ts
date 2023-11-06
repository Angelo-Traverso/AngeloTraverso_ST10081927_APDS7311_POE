import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export default class SignupComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);
  firstname = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);
  lastname = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);
  email = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)]);
  contactNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]);
  confirmPassword = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService, private http: HttpClient, private titleService: Title) {
    this.titleService.setTitle("Signup");
   }

  // Error message objects
  customErrorMessages: { [key: string]: string } = {
    'username': 'Username is required.',
    'firstname': 'First Name is required.',
    'lastname': 'Last Name is required.',
    'email': 'Invalid email format.',
    'contactNumber': 'Contact Number is required.',
    'password': 'Password is required.',
    'confirmPassword': 'Passwords do not match.',
  };


  // Variables to track toggle state
  showPassword = false;
  showConfirmPassword = false;

  // Functions check password visibility state
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Functions check password visibility state
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
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

  dismissError(): void {
    this.hasError = false;
    this.errorMessage = '';
  }
}