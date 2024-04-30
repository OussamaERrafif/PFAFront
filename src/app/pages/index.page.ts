import { Component } from '@angular/core';
import { HomepageComponent } from "./apps/homepage/homepage.component";


@Component({
    selector: 'app-home',
    standalone: true,
    template: `

<app-homepage></app-homepage>

  `,
    styles: [
        `
    `,
    ],
    imports: [HomepageComponent]
})
export default class HomeComponent {

}
