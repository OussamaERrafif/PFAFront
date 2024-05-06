import { Component } from '@angular/core';
import { SecurityComponent } from "./apps/profile/security/security.component";
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';


@Component({
    selector: 'app-sec',
    standalone: true,
    template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
    <app-security></app-security>

  `,
    styles: [``],
    imports: [SecurityComponent, NavbarComponent, AsidebarComponent]
})
export default class SecComponent {

}
