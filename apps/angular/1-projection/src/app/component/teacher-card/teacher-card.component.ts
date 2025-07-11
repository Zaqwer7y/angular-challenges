import { Component, inject, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ListItemComponent } from "../../ui/list-item/list-item.component";

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [type]="cardType"
      customClass="bg-light-red">
        <img ngSrc="assets/img/teacher.png" width="200" height="200" priority />
        <ng-template #rowRef let-teacher>
          <app-list-item (delete)="deleteTeacher(teacher.id)">
              {{ teacher.firstName }}
          </app-list-item>
        </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  
  deleteTeacher(id: number){
      this.store.deleteOne(id);
  }
}
