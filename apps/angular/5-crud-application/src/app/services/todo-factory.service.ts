import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpService } from './http.service';
import { Todo } from '../models/todo';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoFactoryService {
httpService = inject(HttpService);
public todos: WritableSignal<Map<number, Todo>> = signal<Map<number, Todo>>(new Map<number, Todo>());

async initAll() {
  const list = await lastValueFrom(this.httpService.getTodos());
  const newMap = new Map<number, Todo>();
  for(const item of list){
    newMap.set(item.id, item);
  }
  this.todos.set(newMap);
}

async update(todo: Todo){
  const updatedTodo = await lastValueFrom(this.httpService.update(todo));
  const localTodos = new Map(this.todos());
  localTodos.set(todo.id, updatedTodo);
  this.todos.set(localTodos);
}

}
