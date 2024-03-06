import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameEngineService } from '@core/services/game-engine.service';
import { fadeInAnimation } from '@shared/animations/fadeIn.animation';
import { BattleStats, People } from '@state/people/people.model';
import { Starship } from '@state/starships/starships.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle-opponents-card',
  templateUrl: './battle-opponents-card.component.html',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleOpponentsCardComponent {
  @Input() item: People | Starship;
  @Output() itemClicked = new EventEmitter<People | Starship>();

  public stats$: Observable<BattleStats>;

  constructor(private gameEngine: GameEngineService) {}

  selectRandomCharacterOrShip(item: People | Starship) {
    this.itemClicked.emit(item);
    console.log('clik', item?.id);
    if (item?.id) {
      this.stats$ = this.gameEngine.getStats(item.id);
    }
  }

  isPeopleProperties(item: People | Starship): item is People {
    return (item as People)?.mass !== undefined;
  }
}
