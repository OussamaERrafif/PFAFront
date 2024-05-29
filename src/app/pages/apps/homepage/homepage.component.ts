import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  //check if the local has a token
  //if it has a token then go straight to the dashboard
  //else go to the login page
  constructor(private router: Router) {}
  login() {
    if (localStorage.getItem('token')) {
      //user route to the dashboard
      this.router.navigate(['/dashboard']);
    } else {
      //user route to the login page
      this.router.navigate(['/login']);
    }
  }
}
