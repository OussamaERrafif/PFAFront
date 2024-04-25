import { Component } from '@angular/core';
import { SecurityComponent } from "./apps/profile/security/security.component";



@Component({
    selector: 'app-sec',
    standalone: true,
    template: `
    <app-security></app-security>

  `,
    styles: [``],
    imports: [SecurityComponent]
})
export default class SecComponent {

}
