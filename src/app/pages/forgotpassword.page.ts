import { Component } from '@angular/core';
import { ForgotpasswdComponent } from "./apps/authentication/forgotpasswd/forgotpasswd.component";

@Component({
    selector: 'app-forgotpassword',
    standalone: true,
    template: `
    <app-forgot-password></app-forgot-password>

  `,
    styles: [``],
    imports: [ForgotpasswdComponent]
})
export default class ForgotpasswordComponent {

}
