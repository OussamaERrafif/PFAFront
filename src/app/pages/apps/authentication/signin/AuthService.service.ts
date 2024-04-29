import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/admin'; // Your NestJS admin API endpoint

  constructor() { }

  login(name: string, password: string): Observable<any> {
    return from(axios.post(`${this.apiUrl}/login`, { name, password })).pipe(
      map(response => {
        this.storeToken(response.data.access_token);
        console.log('Login successful:', response.status,'access_token:',response.data.access_token , 'response:',response.data);
        return response.data;
      }),
      catchError(error => {
        // Handle login errors
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  private storeToken(token: string): void {
    // Store the token in local storage
    localStorage.setItem('token', token);
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Perform any additional logout tasks if needed
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if a token is present in local storage
    return !!this.getToken();
  }
}
