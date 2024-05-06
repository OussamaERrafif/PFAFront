import { Component } from '@angular/core';
import { DashboardComponent } from './apps/dashboard/dashboard.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';

@Component({
  selector: 'app-d',
  standalone: true,
  template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
    <app-dashboard></app-dashboard>
  `,
  styles: [``],
  imports: [DashboardComponent, NavbarComponent, AsidebarComponent],
})
export default class DComponent {}
