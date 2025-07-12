import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../ui/card/card.component";
import { CityStore } from '../../data-access/city.store';
import { randCity, randCountry, randNumber } from '@ngneat/falso';
import { City } from '../../model/city.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from "../../ui/list-item/list-item.component";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card 
      [list]="this.store.cities()"
      (addEvent)="addCity()"
      [type]="this.cardType"
      customClass="bg-yellow-50">      
        <img ngSrc="assets/img/city.png" width="200" height="200" priority />
        <ng-template #rowRef let-city>
          <app-list-item (delete)="this.deleteCity(city.id)">
            {{ city.name }}
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
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private httpService = inject(FakeHttpService);
  store = inject(CityStore);
  cardType = CardType.CITY;

ngOnInit(): void {
  this.httpService.fetchCities$.subscribe(c => this.store.addAll(c));
}
addCity(){
  const city: City = { name: randCity(), country: randCountry(), id: randNumber()};
  this.store.addOne(city);
}

deleteCity(id: number){
  this.store.deleteOne(id);
}

}
