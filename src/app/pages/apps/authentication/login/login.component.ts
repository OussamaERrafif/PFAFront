import { Component } from '@angular/core';
import { LoginService } from './LoginService.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  name: string = '';
  password: string = '';

  constructor(private authService: LoginService , private router : Router ) {}

  login(): void {
    this.authService.login(this.name, this.password).subscribe(response => {
      // Handle login success or error
      if (response) {
        // Redirect to dashboard or navigate to another page
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
      } else {
        // Display error message
        console.error('Login failed');
      }
    });
  }

  
}
