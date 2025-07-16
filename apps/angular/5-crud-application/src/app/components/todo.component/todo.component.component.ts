import { Component, inject, input } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoFactoryService } from '../../services/todo-factory.service';
import { randText } from '@ngneat/falso';

@Component({
  selector: 'app-todo-item',
  imports: [],
  template: `
  <li>
    {{ this.todo().title }}
    <button (click)="this.update(todo())">Update</button>
    <button (click)="this.delete(todo().id)">Delete</button>
  </li>
  `
})
export class TodoComponentComponent {
  public todo = input.required<Todo>();
  readonly factory = inject(TodoFactoryService);
  
    update(todo: Todo) {
      const newTodo: Todo = { id: todo.id, userId: todo.userId, title: randText(), isCompleted: false};
      this.factory.update(newTodo);
    }

    delete(id: number){
      this.factory.delete(id);
    }
}
