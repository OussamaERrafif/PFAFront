import { Component } from '@angular/core';
import { SignupComponent } from "./apps/authentication/signup/signup.component";





@Component({
    selector: 'app-signupp',
    standalone: true,
    template: `
   <app-signup></app-signup>
  `,
    styles: [``],
    imports: [SignupComponent]
})
export default class SignuppComponent {

}
