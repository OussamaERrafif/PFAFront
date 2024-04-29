import { Component } from '@angular/core';
import { HeroComponent } from './apps/hero/hero.component';




@Component({
    selector: 'app-herosec',
    standalone: true,
    template: `
    <app-hero></app-hero>

  `,
    styles: [``],
    imports: [HeroComponent]
})
export default class herosec {
  

}
