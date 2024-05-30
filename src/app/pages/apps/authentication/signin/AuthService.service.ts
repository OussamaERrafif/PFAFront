import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Your NestJS admin API endpoint

  constructor() {}

  login(username: string, password: string): Observable<any> {
    return from(axios.post(`${this.apiUrl}/login`, { username, password })).pipe(
        map((response) => {
            this.storeToken(response.data.access_token, response.data.role);
            console.log(
                'Login successful:',
                response.status,
                'access_token:',
                response.data.access_token,
                'response:',
                response.data
            );
            return response.data;
        }),
        catchError((error) => {
            // Handle login errors
            console.error('Login failed:', error);
            
            throw error;
        })
    );
}

  private storeToken(token: string , role:string): void {
    // Store the token in local storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
    }
  }

  logout(): void {
    // Remove the token from local storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
    }
    // Perform any additional logout tasks if needed
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    // Check if a token is present in local storage
    console.log('isLoggedIn:', !!this.getToken());
    return !!this.getToken();
  }
}
