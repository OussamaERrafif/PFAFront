import { Component } from '@angular/core';

@Component({
  selector: 'app-asidebar',
  standalone: true,
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.css']
})
export class AsidebarComponent {
  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
