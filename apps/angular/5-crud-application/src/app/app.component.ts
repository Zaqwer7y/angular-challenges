import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './models/todo';
import { TodoRequest } from './models/todo-request';

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
  private http = inject(HttpClient);

  todos!: Todo[];

  ngOnInit(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  update(todo: Todo) {
    this.http
      .put<TodoRequest>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({todo: todo.id, title: randText(), userId: todo.userId}),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: TodoRequest) => {
        this.todos[todoUpdated.todo - 1] = { id: todoUpdated.todo, userId: todoUpdated.userId, title: todoUpdated.title, isCompleted: true};
      });
  }
}
