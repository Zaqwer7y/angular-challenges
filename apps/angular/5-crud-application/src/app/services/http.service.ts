import { inject, Injectable, } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  getTodos() : Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(catchError(x => this.handleError(x)));
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
          ).pipe(catchError(x => this.handleError(x)));
  }

  delete(id: number) : Observable<Todo>{
    return this.http.delete<Todo>(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .pipe(catchError(x => this.handleError(x)));
  }

  handleError(error: HttpErrorResponse) : Observable<any>{
    console.log(error);
    alert(error.error);
    return throwError(() => error);
  }
}
