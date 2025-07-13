import { inject, Injectable, } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoRequest } from '../models/todo-request';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  

  getTodos() : Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(todo: Todo) : Observable<TodoRequest> {
    return this.http
          .put<TodoRequest>(
            `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
            JSON.stringify({todo: todo.id, title: randText(), userId: todo.userId}),
            {
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            },
          )
  }
}
