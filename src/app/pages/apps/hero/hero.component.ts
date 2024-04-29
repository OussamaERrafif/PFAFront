import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent { }
