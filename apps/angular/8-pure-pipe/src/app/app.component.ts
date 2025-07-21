import { Component } from '@angular/core';
import { IndexPipe } from "./IndexPipe";

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | index:$index}}
    }
  `,
  imports: [IndexPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
