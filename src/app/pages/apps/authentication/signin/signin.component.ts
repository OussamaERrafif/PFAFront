import { Component } from '@angular/core';
import { AuthService } from './AuthService.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  // name: string = '';
  // password: string = '';

  // constructor(private authService: AuthService , private router : Router ) {}

  // login(): void {
  //   this.authService.login(this.name, this.password).subscribe(response => {
  //     // Handle login success or error
  //     if (response) {
  //       // Redirect to dashboard or navigate to another page
  //       console.log('Login successful');
  //       this.router.navigate(['/dashboard']);
  //     } else {
  //       // Display error message
  //       console.error('Login failed');
  //     }
  //   });
  // }

  name: string =' ';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.name, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Handle login error
        this.showToast();
      }
    });
  }

  showToast() {
    const toast = document.getElementById('toast-warning');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        this.closeToast();
      }, 5000); // Auto-hide after 5 seconds
    }
  }

  closeToast() {
    const toast = document.getElementById('toast-warning');
    if (toast) {
      toast.classList.add('hidden');
    }
  }
  

  
}
