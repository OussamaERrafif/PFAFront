import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { HeroService } from './heroservice.compnent';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  providers: [HeroService],
})
export class HeroComponent {
    @Output() conditionChanged = new EventEmitter<boolean>();
  
    constructor(public heroService: HeroService) {}
  
    enter() {
      this.heroService.enter();
      this.conditionChanged.emit(this.heroService.wanttoenter);
      console.log('enter', this.heroService.wanttoenter);
    }
  }
