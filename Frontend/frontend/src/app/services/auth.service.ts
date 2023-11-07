import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Base url
  private readonly BASE_URL = 'https://localhost:3000'
  
  // Constructor
  constructor(private http: HttpClient) { }
  

  // Checks to see if a user is logged in by ensuring they have a token
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('x-auth-token')
    return token ? true : false
  }


  // Gets logged in users' token
  get token() {
    return localStorage.getItem('x-auth-token')
  }

  // Logs user in
  login(username: string, password: string) {
    return this.http.post(`${this.BASE_URL}/api/auth`, { username, password })
  }

  // Stores users' username in session storage
  storeUsernameInSessionStorage(username: string): void {
    sessionStorage.setItem('username', username);
  }

  // Gets username from the session storage
  getUsernameFromSessionStorage(): string | null {
    return sessionStorage.getItem('username');
  }

  // Logs user out - user is redirected to login and their auth token is removed
  logout(): void {
    localStorage.removeItem('x-auth-token');
  }


  // Signs a user up using their credentials
  signUp(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    contactNumber: string,
    password: string
  ) {
    return this.http.post(`${this.BASE_URL}/api/users`, {

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
