import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  wanttoenter: boolean | undefined;

constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Check if the code is running in the browser environment
    if (isPlatformBrowser(this.platformId)) {
        // Retrieve the value from localStorage and assert it as a string
        this.wanttoenter = JSON.parse(localStorage.getItem('wanttoenter') as string) || false;
        console.log('wanttoenter1', this.wanttoenter);
    }
}

  enter() {
    // Toggle the value
    this.wanttoenter = !this.wanttoenter;
    // Check if the code is running in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Store the updated value in localStorage
      localStorage.setItem('wanttoenter', JSON.stringify(this.wanttoenter));
      console.log('wanttoenter2', this.wanttoenter);
    }
  }
}
