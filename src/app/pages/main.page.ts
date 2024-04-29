import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar.component';
import { HeaderComponent } from '../layout/header.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
    `,
  ],
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    NavbarComponent,
    AsidebarComponent,
  ],
})
export class MainComponent {}
