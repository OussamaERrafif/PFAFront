import { Component } from '@angular/core';
import { CalendarComponent } from "./apps/calendar/calendar.component";

@Component({
    selector: 'app-calend',
    standalone: true,
    template: `
    <app-calendar></app-calendar>
  `,
    styles: [``],
    imports: [CalendarComponent]
})
export default class CalenComponent {

}
