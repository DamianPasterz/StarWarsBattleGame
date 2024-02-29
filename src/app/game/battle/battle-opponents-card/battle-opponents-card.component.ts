import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeInAnimation } from '@shared/animations/fadeIn.animation';
import { People } from '@state/people/people.model';
import { Starship } from '@state/starships/starships.model';

@Component({
  selector: 'app-battle-opponents-card',
  templateUrl: './battle-opponents-card.component.html',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
