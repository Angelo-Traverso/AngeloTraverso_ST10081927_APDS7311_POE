import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = new FormControl(''); 
  password = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit():void{}

  onSubmit(e: Event){
    e.preventDefault();
    this.hasError = false;
  
    console.log('Username:', this.username.value);
    console.log('Password:', this.password.value);

    if (!this.username.value || !this.password.value){
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields'
      return;
    }

    this.auth.login(this.username.value, this.password.value).subscribe({
      next: (v) =>{
        const { token } = v as any;
        localStorage.setItem('x-auth-token', token);

        if (this.username.value !== null) {
          this.auth.storeUsernameInSessionStorage(this.username.value);
        }

         // Set userAuthenticated to true after successful login
        console.log("Ive been reached!")
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = 'Error logging in, check username or password'
      },
    });
  }

  dismissError(): void {
    this.hasError = false;
    this.errorMessage = '';
  }
}
