import { Component } from '@angular/core';
import { InventoryComponent } from "./apps/inventory/inventory.component";

@Component({
    selector: 'app-i',
    standalone: true,
    template: `
    <app-inventory></app-inventory>

  `,
    styles: [``],
    imports: [InventoryComponent]
})
export default class IComponent {}
