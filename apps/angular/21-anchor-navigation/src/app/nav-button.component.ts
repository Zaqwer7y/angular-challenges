/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  template: `
    <a [routerLink]="this.navRouterLink()" [fragment]="this.navFragment()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
  imports: [RouterLink],
})
export class NavButtonComponent {
  navRouterLink = input('');
  navFragment = input<string | undefined>(undefined);
}
