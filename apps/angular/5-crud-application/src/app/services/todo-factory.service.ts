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
public itemLoadingId:WritableSignal<number> = signal(-1);
public globalLoading:WritableSignal<boolean> = signal(false);

async initAll() {
  this.globalLoading.set(true);
  const list = await lastValueFrom(this.httpService.getTodos());
  const newMap = new Map<number, Todo>();
  for(const item of list){
    newMap.set(item.id, item);
  }
  this.todos.set(newMap);
  this.globalLoading.set(false);
}

async update(todo: Todo){
  this.itemLoadingId.set(todo.id);
  const updatedTodo = await lastValueFrom(this.httpService.update(todo));
  const localTodos = new Map(this.todos());
  localTodos.set(todo.id, updatedTodo);
  this.todos.set(localTodos);
  this.itemLoadingId.set(-1);
}

async delete(id: number){
  this.itemLoadingId.set(id);
  await lastValueFrom(this.httpService.delete(id));
  const localTodos = new Map(this.todos());
  localTodos.delete(id);
  this.todos.set(localTodos);
  this.itemLoadingId.set(-1);
}

}
