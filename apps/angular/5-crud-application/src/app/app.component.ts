import { Component, inject, OnInit} from '@angular/core';
import { TodoFactoryService } from './services/todo-factory.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
;
import { TodoComponentComponent } from "./components/todo.component/todo.component.component";

@Component({
  imports: [TodoComponentComponent, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
  @if (this.factory.isLoading) 
    {
      <mat-spinner id="spinner"></mat-spinner>
    }
  <ul [class.disabled]="this.factory.isLoading">
    @for (todo of todos(); track todo[1].id) {
        <app-todo-item [todo]="todo[1]"></app-todo-item>
    }
  </ul>
  `,
  styles: [
    '#spinner { position: fixed; }',
    '.disabled { opacity: 0.5; background: #CCC; pointer-events: none; }'
  ],
})
export class AppComponent implements OnInit {
public readonly factory = inject(TodoFactoryService);

public todos = this.factory.todos;

  ngOnInit(): void {
    this.factory.initAll();
  }
}
