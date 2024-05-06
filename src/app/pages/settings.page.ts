import { Component } from '@angular/core';
import { SettingsComponent } from './apps/settings/settings.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';

@Component({
  selector: 'app-sec',
  standalone: true,
  template: ` 
  <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
  <app-settings></app-settings> `,
  styles: [``],
  imports: [SettingsComponent, NavbarComponent, AsidebarComponent],
})
export default class SettingComponent {}
