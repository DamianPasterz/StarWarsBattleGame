import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { GameEngineService } from '@core/services/game-engine.service';
import { fadeInAnimation } from '@shared/animations/fadeIn.animation';
import { BattleStats, People } from '@state/people/people.model';
import { Starship } from '@state/starships/starships.model';

@Component({
  selector: 'app-battle-opponents-card',
  templateUrl: './battle-opponents-card.component.html',
  styleUrls: ['./battle-opponents-card.component.scss'],
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleOpponentsCardComponent {
  @Input() item: People | Starship;
  @Output() itemClicked = new EventEmitter<People | Starship>();

  public stats$: Observable<BattleStats>;

  constructor(private gameEngine: GameEngineService) {}

  public selectRandomCharacterOrShip(item: People | Starship): void {
    this.itemClicked.emit(item);
    if (item?.id) {
      this.stats$ = this.gameEngine.getStats(item.id);
    }
  }

  isPeopleProperties(item: People | Starship): item is People {
    return (item as People)?.mass !== undefined;
  }
}
