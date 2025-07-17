import { Component, computed, signal } from '@angular/core';

type Difficulty = 'EASY' | 'NORMAL';

type Direction = { [K in 'left' | 'right']: string }
const DirectionMap: Direction ={
  left: 'left',
  right: 'right'
}

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <section>
      <div>
        <button mat-stroked-button (click)="difficulty.set('EASY')">
          Easy
        </button>
        <button mat-stroked-button (click)="difficulty.set('NORMAL')">
          Normal
        </button>
      </div>
      <p>Selected Difficulty: {{ difficultyLabel() }}</p>
    </section>

    <section>
      <div>
        <button mat-stroked-button (click)="direction.set('left')">
          Left
        </button>
        <button mat-stroked-button (click)="direction.set('right')">
          Right
        </button>
      </div>
      <p>{{ directionLabel() }}</p>
    </section>
  `,
  styles: `
    section {
      @apply mx-auto my-5 flex w-fit flex-col items-center gap-2;

      > div {
        @apply flex w-fit gap-5;
      }
    }

    button {
      @apply rounded-md border px-4 py-2;
    }
  `,
})
export class AppComponent {
  readonly difficulty = signal<Difficulty>('EASY');
  readonly direction = signal<keyof Direction | undefined>(undefined);

  readonly difficultyLabel = computed<string>(() => {
    switch (this.difficulty()) {
      case 'EASY':
        return 'EASY';
      case 'NORMAL':
        return 'NORMAL';
    }
  });

  readonly directionLabel = computed<string>(() => {
    const prefix = 'You chose to go';
    switch (this.direction()) {
      case 'left':
        return `${prefix} ${DirectionMap.left}`;
      case 'right':
        return `${prefix} ${DirectionMap.right}`;
      default:
        return 'Choose a direction!';
    }
  });
}
