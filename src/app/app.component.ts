import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar.component';
import { HeaderComponent } from './layout/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AsidebarComponent } from './layout/asidebar/asidebar.component';
import { HeroComponent } from './pages/apps/hero/hero.component';
import { NgIf } from '@angular/common';
import { HeroService } from './pages/apps/hero/heroservice.compnent';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ng-container *ngIf="condition; else elseBlock">
      <app-asidebar></app-asidebar>
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
    </ng-container>
    <ng-template #elseBlock>
      <app-hero (conditionChanged)="updateCondition($event)"></app-hero>
    </ng-template>
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
    NgIf,
    HeroComponent,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    NavbarComponent,
    AsidebarComponent,
  ],
})
export class AppComponent {
  condition: boolean;

  constructor(public heroService: HeroService) {
    this.condition = this.heroService.wanttoenter;
  }

  updateCondition(newCondition: boolean) {
    this.condition = newCondition;
  }
}
