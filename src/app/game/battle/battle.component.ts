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
  public peopleOpponents$: Observable<{
    opponentOne: People;
    opponentTwo: People;
  }>;
  public starshipOpponents$: Observable<{
    opponentOne: Starship;
    opponentTwo: Starship;
  }>;

  public winner$: Observable<WinType>;
  public queryParams = '';

  constructor(
    private route: ActivatedRoute,
    private gameEngine: GameEngineService
  ) {
    this.peopleOpponents$ = this.gameEngine.peopleOpponentsObservable$;
    this.starshipOpponents$ = this.gameEngine.starshipOpponentsObservable$;
    this.winner$ = this.gameEngine.winnerNameObservable$;
    this.queryParams = this.route.snapshot.queryParams['battle'];
  }

  ngOnInit(): void {
    this.initNewGame();
  }

  private initNewGame(): void {
    this.gameEngine.initialGame(this.queryParams);
  }

  public selectRandomCharacterOrShip(name: People | Starship, position: 'opponentOne' | 'opponentTwo'): void {
    if (name !== null) return;
    this.queryParams === BattleType.People
      ? this.gameEngine.getRandomPeopleOpponent(position)
      : this.gameEngine.getRandomStarshipOpponent(position);
  }

  public fight(): void {
    this.gameEngine.fight();
  }

  public handleIdClicked(itemId: string): void {
    this.gameEngine.getStats(itemId);
  }
}
