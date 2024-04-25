import { Component } from '@angular/core';
import { BillingsComponent } from "./apps/profile/billings/billings.component";



@Component({
    selector: 'app-bill',
    standalone: true,
    template: `
    <app-billings></app-billings>
  `,
    styles: [``],
    imports: [BillingsComponent]
})
export default class BillComponent {

}
