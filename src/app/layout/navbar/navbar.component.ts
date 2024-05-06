import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import icon from './icon.png';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
})
export class NavbarComponent {
  isProfileMenuOpen: boolean = false;

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  // Déclarer la fonction toggleMobileMenu
  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

  signout() {
    sessionStorage.removeItem('token');
    console.log('User signed out');
  }
}
