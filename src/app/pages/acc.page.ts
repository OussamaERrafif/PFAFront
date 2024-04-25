import { Component } from '@angular/core';
import { AccountComponent } from "./apps/profile/account/account.component";


@Component({
    selector: 'app-acc',
    standalone: true,
    template: `
    <app-account></app-account>
  `,
    styles: [``],
    imports: [AccountComponent]
})
export default class AccComponent {

}
