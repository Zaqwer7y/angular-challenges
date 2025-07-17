import { Component, inject, input } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoFactoryService } from '../../services/todo-factory.service';
import { randText } from '@ngneat/falso';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todo-item',
  imports: [MatProgressSpinnerModule],
  template: `
  <li [class.disabled]="this.factory.itemLoadingId() === this.todo().id">
  @if (this.factory.itemLoadingId() === this.todo().id) 
    {
      <mat-spinner id="spinner" [diameter]="15"></mat-spinner>
    }
    {{ this.todo().title }}
    <button (click)="this.update(todo())">Update</button>
    <button (click)="this.delete(todo().id)">Delete</button>
  </li>
  `,
  styles: [
    '#spinner { display: inline-block }',
    '.disabled { opacity: 0.5; background: #CCC; pointer-events: none; }'
  ]
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
