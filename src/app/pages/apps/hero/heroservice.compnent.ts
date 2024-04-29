import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  wanttoenter: boolean = false;

  enter() {
    this.wanttoenter = !this.wanttoenter;
    return this.wanttoenter;
  }
}
