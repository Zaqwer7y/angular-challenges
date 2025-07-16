import { Component, inject, OnInit} from '@angular/core';
import { Todo } from './models/todo';
import { TodoFactoryService } from './services/todo-factory.service';
import { randText } from '@ngneat/falso';
import { TodoComponentComponent } from "./components/todo.component/todo.component.component";

@Component({
  imports: [TodoComponentComponent],
  selector: 'app-root',
  template: `
  <ul>
    @for (todo of todos(); track todo[1].id) {
      <li>
        <app-todo-item [todo]="todo[1]"></app-todo-item>
      </li>
    }
  </ul>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
private factory = inject(TodoFactoryService);

public todos = this.factory.todos;

  ngOnInit(): void {
    this.factory.initAll();
  }
}
