import { inject, Injectable, } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  update(todo: Todo) : Observable<Todo> {
    return this.http
          .put<Todo>(
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
