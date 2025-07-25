import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import {RouterLink} from '@angular/router';

@Component({
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <nav-button routerLink="" class="fixed left-1/2 top-3">Home Page</nav-button>
    <div class="h-screen bg-blue-200">section 1</div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
