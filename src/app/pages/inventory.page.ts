import { Component } from '@angular/core';
import { InventoryComponent } from "./apps/inventory/inventory.component";
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';
@Component({
    selector: 'app-i',
    standalone: true,
    template: `
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
    <app-inventory></app-inventory>

  `,
    styles: [``],
    imports: [InventoryComponent, NavbarComponent, AsidebarComponent]
})
export default class IComponent {}
