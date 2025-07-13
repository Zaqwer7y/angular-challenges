import { Component, Inject, inject, OnInit } from '@angular/core';
import { Todo } from './models/todo';
import { TodoRequest } from './models/todo-request';
import { HttpService } from './services/http.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
  <ul>
    @for (todo of todos; track todo.id) {
      <li>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </li>
    }
  </ul>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
private http = inject(HttpService);

  todos!: Todo[];

  ngOnInit(): void {
    this.http.getTodos().subscribe(todos => this.todos = todos);
  }

  update(todo: Todo) {
    this.http.update(todo)
      .subscribe((todoUpdated: TodoRequest) => {
        this.todos[todoUpdated.todo - 1] = { id: todoUpdated.todo, userId: todoUpdated.userId, title: todoUpdated.title, isCompleted: true};
      });
  }
}
