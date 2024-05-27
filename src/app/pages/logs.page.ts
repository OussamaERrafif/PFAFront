import { Component } from '@angular/core';
import { LogsComponent } from './apps/logs/logs.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AsidebarComponent } from '../layout/asidebar/asidebar.component';




@Component({
    selector: 'app-logss',
    standalone: true,
    template: `
    
    <app-asidebar></app-asidebar>
    <app-navbar></app-navbar>
   <app-logs></app-logs>
  `,
    styles: [``],
    imports: [LogsComponent,AsidebarComponent,NavbarComponent]
})
export default class Logspage {

}
