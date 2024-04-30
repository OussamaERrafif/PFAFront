import { Component, OnInit } from '@angular/core';
import { dashguard } from './dashboard.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [dashguard],
})
export class DashboardComponent {
  constructor(private router: Router, private dashguard: dashguard) {
    this.dashguard.canActivateChild();
  }
}
