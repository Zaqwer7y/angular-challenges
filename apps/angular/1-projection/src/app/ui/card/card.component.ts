import { Component, ContentChild, inject, input, output, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
        <ng-content select="img"></ng-content>
      <section>
        
        @for (item of list(); track item.id) {
          <ng-container *ngTemplateOutlet="rowTemplate; context: { $implicit: item }">
          </ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addEvent.emit()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: any }>;

  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');
  addEvent = output();

  CardType = CardType;
}
