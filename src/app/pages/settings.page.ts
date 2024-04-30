import { Component } from '@angular/core';
import { SettingsComponent } from './apps/settings/settings.component';

@Component({
  selector: 'app-sec',
  standalone: true,
  template: ` <app-settings></app-settings> `,
  styles: [``],
  imports: [SettingsComponent],
})
export default class SettingComponent {}
