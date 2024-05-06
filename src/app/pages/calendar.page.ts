import { Component } from '@angular/core';
import { CalendarComponent } from "./apps/calendar/calendar.component";
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';


@Component({
    selector: 'app-calend',
    standalone: true,
    template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
    <app-calendar></app-calendar>
  `,
    styles: [``],
    imports: [CalendarComponent, NavbarComponent, AsidebarComponent]
})
export default class CalenComponent {

}
