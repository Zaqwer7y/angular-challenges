import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  imports: [],
  template: `
    <div>TestId: {{ this.testId() }}</div>
    <div>Permission: {{ this.permission() }}</div>
    <div>User: {{ this.user() }}</div>
  `,
})
export default class TestComponent {
  testId = input<number>();
  permission = input<string>();
  user = input<string>();
}
