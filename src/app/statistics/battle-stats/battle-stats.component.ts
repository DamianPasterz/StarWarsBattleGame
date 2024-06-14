import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BattleStats, PeopleFacade } from '@state/people';
import { StarshipsFacade } from '@state/starships';

@Component({
  selector: 'app-battle-stats',
  templateUrl: './battle-stats.component.html',
  styleUrls: ['./battle-stats.component.scss'],
})
export class BattleStatsComponent {
  public peopleStats$: Observable<BattleStats[]>;
  public starshipStats$: Observable<BattleStats[]>;
  constructor(
    private peopleFacade: PeopleFacade,
    private starshipsFacade: StarshipsFacade
  ) {
    this.peopleStats$ = this.peopleFacade.allStats$;
    this.starshipStats$ = this.starshipsFacade.allStats$;
  }
}
