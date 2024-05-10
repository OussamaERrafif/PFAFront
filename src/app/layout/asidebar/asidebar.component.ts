import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-asidebar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.css']
})
export class AsidebarComponent {
  isSubMenuOpen: boolean = false;

  isAdmin: boolean = false;

  
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const role = window.sessionStorage.getItem('role');
      if (role === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }
  
  
  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}

