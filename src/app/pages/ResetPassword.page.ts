import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';
import { ResetPasswordComponent } from './apps/authentication/ResetPassword/ResetPassword.component';


@Component({
    selector: 'app-sec',
    standalone: true,
    template: `
    <app-reset-password></app-reset-password>

  `,
    styles: [``],
    imports: [ResetPasswordComponent, NavbarComponent, AsidebarComponent]
})
export default class ResetPassword {

}
