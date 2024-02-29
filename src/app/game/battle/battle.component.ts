import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameEngineService } from '@core/services/game-engine.service';
import { PeopleProperties } from '@state/people';
import { StarshipProperties } from '@state/starships';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit {
  public peopleOponents$: Observable<{
    oponentOne: PeopleProperties;
    oponentTwo: PeopleProperties;
  }>;
  public starshipOponents$: Observable<{
    oponentOne: StarshipProperties;
    oponentTwo: StarshipProperties;
  }>;

  public winner$: Observable<string>;
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

  public selectRandomCharacterOrShip(name: string): void {
    if (name !== null) return;
    this.queryParams === 'people'
      ? this.gameEngine.getRandomPeopleOpponent()
      : this.gameEngine.getRandomStarshipOpponent();
  }

  public fight(): void {
    this.gameEngine.fight();
  }
}
