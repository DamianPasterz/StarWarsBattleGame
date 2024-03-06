import { Component } from '@angular/core';
import { BattleStats, PeopleFacade } from '@state/people';
import { Planet, PlanetsFacade } from '@state/planets';
import { StarshipsFacade } from '@state/starships';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle-stats',
  templateUrl: './battle-stats.component.html',
  styleUrls: ['./battle-stats.component.scss'],
})
export class BattleStatsComponent {
  public peopleStats$: Observable<BattleStats[]>;
  public starshipStats$: Observable<BattleStats[]>;
  public planetsList$: Observable<Planet[]>;
  constructor(
    private peopleFacade: PeopleFacade,
    private starshipsFacade: StarshipsFacade,
    private planetsFacade: PlanetsFacade
  ) {
    this.peopleStats$ = this.peopleFacade.allStats$;
    this.starshipStats$ = this.starshipsFacade.allStats$;
    this.planetsFacade.getPlanets();
    this.planetsList$ = this.planetsFacade.AllPlanets;

    console.log(this.peopleStats$);
  }
}
