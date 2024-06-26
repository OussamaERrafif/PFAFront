import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AsidebarComponent } from './layout/asidebar/asidebar.component';
import { HomepageComponent } from './pages/apps/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <router-outlet></router-outlet> `,
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
    NavbarComponent,
    AsidebarComponent,
    HomepageComponent,
  ],
})
export class AppComponent {
  title = 'FrontEnd';
  
}
