import { Component } from '@angular/core';
import { calandarguard } from './calendar.guard';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  isDropdownOpen: boolean = false;
  constructor(private calandarguard: calandarguard) {
    this.calandarguard.canActivateChild();
  }


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
