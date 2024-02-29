import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { People } from '@state/people/people.model';
import { Starship } from '@state/starships/starships.model';

@Component({
  selector: 'app-battle-opponents-card',
  templateUrl: './battle-opponents-card.component.html',
  styleUrls: ['./battle-opponents-card.component.scss'],
  animations: [
    trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))])]),
  ],
})
export class BattleOpponentsCardComponent {
  @Input() item: People | Starship;
  @Output() itemClicked = new EventEmitter<People | Starship>();

  public isPeople: boolean;

  selectRandomCharacterOrShip(item: People | Starship) {
    this.itemClicked.emit(item);
  }

  isPeopleProperties(item: People | Starship): item is People {
    return (item as People)?.mass !== undefined;
  }
}
