import { Component, inject, OnInit} from '@angular/core';
import { Todo } from './models/todo';
import { TodoFactoryService } from './services/todo-factory.service';
import { randText } from '@ngneat/falso';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
  <ul>
    @for (todo of todos(); track todo[1].id) {
      <li>
        {{ todo[1].title }}
        <button (click)="update(todo[1])">Update</button>
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

  update(todo: Todo) {
    const newTodo: Todo = { id: todo.id, userId: todo.userId, title: randText(), isCompleted: false};
    this.factory.update(newTodo);
  }
}
