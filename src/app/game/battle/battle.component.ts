import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BattleType, WinType } from '@core/services/game-engine.model';
import { GameEngineService } from '@core/services/game-engine.service';

import { People } from '@state/people';
import { Starship } from '@state/starships';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit {
  public peopleOponents$: Observable<{
    oponentOne: People;
    oponentTwo: People;
  }>;
  public starshipOponents$: Observable<{
    oponentOne: Starship;
    oponentTwo: Starship;
  }>;

  public winner$: Observable<WinType>;
  public queryParams = '';

  constructor(
    private route: ActivatedRoute,
    private gameEngine: GameEngineService
  ) {
    this.peopleOponents$ = this.gameEngine.peopleOponentsObservable$;
    this.starshipOponents$ = this.gameEngine.starshipOponentsObservable$;
    this.winner$ = this.gameEngine.winnerNameObservable$;
    this.queryParams = this.route.snapshot.queryParams['battle'];
  }

  ngOnInit(): void {
    this.initNewGame();
  }

  private initNewGame(): void {
    this.gameEngine.initialGame(this.queryParams);
  }

  public selectRandomCharacterOrShip(name: People | Starship): void {
    if (name !== null) return;
    this.queryParams === BattleType.People
      ? this.gameEngine.getRandomPeopleOpponent()
      : this.gameEngine.getRandomStarshipOpponent();
  }

  public fight(): void {
    this.gameEngine.fight();
  }
}
