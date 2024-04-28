import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-asidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.css']
})
export class AsidebarComponent {
  isSubMenuOpen: boolean = false;

  sidebarItems = {
    "Home": [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: "svg path or icon class",
        count: 5
      },
      {
        label: "Profile",
        submenu: [
          { label: "Account", href: "/acc" },
          { label: "Security", href: "/security" },
          { label: "Billings", href: "/bills" }
        ]
      },
      {
        label: "Projects",
        href: "/project",
        count: 12
      },
      {
        label: "Calendar",
        href: "/calendar",
        count: "20+"
      },
      {
        label: "Documents",
        href: "/document"
      },
      {
        label: "Reports",
        href: "/inventory"
      }
    ],
    "Authentication": [
      {
        label: "Sign In",
        href: "/signup",
        icon: "S"
      },
      {
        label: "Forgot Password",
        href: "/forgotpassword",
        icon: "F"
      },
      {
        label: "W",
        href: "#"
      }
    ],
    "Settings": [
      {
        label: "Settings",
        href: "/settings",
        icon: "svg path or icon class"
      }
    ]
  };
  
  
  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}

