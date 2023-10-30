import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly BASE_URL = 'https://localhost:3000'
  constructor(private http: HttpClient) { }
  
  

// --------------------------------------------------------------------------------- //

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('x-auth-token')
    return token ? true : false
  }

// --------------------------------------------------------------------------------- //

  get token() {
    return localStorage.getItem('x-auth-token')
  }

// --------------------------------------------------------------------------------- //

  login(username: string, password: string) {
    console.log(this.http.post(`${this.BASE_URL}/api/auth`, { username, password }))
    return this.http.post(`${this.BASE_URL}/api/auth`, { username, password })
   
  }

// --------------------------------------------------------------------------------- //

  logout(): void {
    localStorage.removeItem('x-auth-token');
  }

// --------------------------------------------------------------------------------- //

  signUp(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    contactNumber: string,
    password: string
  ) {
    return this.http.post(`${this.BASE_URL}/api/auth`, {

      username,
      firstname,
      lastname,
      email,
      contactNumber,
      password
    });
  }
}

// ..........oooooooooo0000000000 END OF FILE 0000000000oooooooooo.......... //
