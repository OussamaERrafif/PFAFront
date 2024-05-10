import { Component } from '@angular/core';
import { UserComponent } from './apps/usermanagment/user.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';

@Component({
  selector: 'app-userma',
  standalone: true,
  template: ` 
  <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
  <app-user></app-user> `,
  styles: [``],
  imports: [UserComponent, NavbarComponent, AsidebarComponent],
})
export default class UserMaComponent {}
