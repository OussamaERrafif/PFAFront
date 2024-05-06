import { Component } from '@angular/core';
import { AccountComponent } from "./apps/profile/account/account.component";
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';


@Component({
    selector: 'app-acc',
    standalone: true,
    template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
    <app-account></app-account>
  `,
    styles: [``],
    imports: [AccountComponent, NavbarComponent, AsidebarComponent]
})
export default class AccComponent {

}
