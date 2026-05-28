import { Component, inject, NgZone, signal } from '@angular/core';
import { fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    @if (displayButton()) {
      <button (click)="goToTop()">Top</button>
    }
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'scroll-cd';

  public displayButton = signal(false);
  private readonly ngZone = inject(NgZone);

  constructor() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(
          map(() => window.scrollY),
          tap((position) => {
            this.displayButton.set(position > 50);
          }),
        )
        .subscribe();
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
