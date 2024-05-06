import { Component } from '@angular/core';
import { BillingsComponent } from "./apps/profile/billings/billings.component";
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';


@Component({
    selector: 'app-bill',
    standalone: true,
    template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
    <app-billings></app-billings>
  `,
    styles: [``],
    imports: [BillingsComponent, NavbarComponent, AsidebarComponent]
})
export default class BillComponent {

}
