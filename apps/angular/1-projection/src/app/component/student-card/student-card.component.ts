import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FakeHttpService, randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ListItemComponent } from "../../ui/list-item/list-item.component";

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [type]="cardType"
      customClass="bg-light-green"
      (addEvent)="addNewStudent()">      
        <img ngSrc="assets/img/student.webp" width="200" height="200" priority />
        <ng-template #rowRef let-student>
          <app-list-item (delete)="deleteStudent(student.id)">
            {{ student.firstName }}
          </app-list-item>
        </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent]
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  deleteStudent(id: number){
    this.store.deleteOne(id);
  }
  addNewStudent(){
    this.store.addOne(randStudent());
  }
}
