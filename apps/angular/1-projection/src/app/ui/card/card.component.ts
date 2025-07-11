import { Component, ContentChild, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
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
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  private teacherStore = inject(TeacherStore);
  private studentStore = inject(StudentStore);
  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: any }>;

  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');

  CardType = CardType;

  addNewItem() {
    const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    }
  }

  deleteItem(id: number){
    const type = this.type();
    if (type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    }
  }
}
