import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SignupService {
    private apiUrl = 'http://localhost:3000/auth'; // Your NestJS admin API endpoint
    
    constructor() {}
    
    signup(fullname: string, username: string, email: string, password: string): Observable<any> {
        return from(axios.post(`${this.apiUrl}/signup`, { username,  password,email,fullname })).pipe(
        map((response) => {
            console.log(
            'Signup successful:',
            response.status,
            'response:',
            response.data
            );
            return response.data;
        }),
        catchError((error) => {
            // Handle signup errors
            console.error('Signup failed:', error);
            throw error;
        })
        );
    }
    
    private storeToken(token: string): void {
        // Store the token in local storage
        if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', token);
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

  
}
