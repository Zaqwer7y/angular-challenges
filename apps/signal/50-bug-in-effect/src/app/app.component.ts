import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);
  private previouslyCheckedItems = 0;
  private checkedItems = computed<number>(() => 
    {      
      return +this.drive() + +this.ram() + +this.gpu();
    });

  constructor() {
    effect(() => {
        const checkedItems = this.checkedItems();
        if(checkedItems > this.previouslyCheckedItems)
          alert('Price increased!');
        this.previouslyCheckedItems = checkedItems;
      });
  }
}
