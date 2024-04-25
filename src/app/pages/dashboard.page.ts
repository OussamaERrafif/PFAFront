import { Component } from '@angular/core';
import { DashboardComponent } from "./apps/dashboard/dashboard.component";

@Component({
    selector: 'app-d',
    standalone: true,
    template: `
  <app-dashboard></app-dashboard>
  `,
    styles: [``],
    imports: [DashboardComponent]
})
export default class DComponent {}
