import { Component } from '@angular/core';
import { SigninComponent } from "./apps/authentication/signin/signin.component";




@Component({
    selector: 'app-login',
    standalone: true,
    template: `
   <app-signin></app-signin>
  `,
    styles: [``],
    imports: [SigninComponent]
})
export default class LoginComponent {

}
