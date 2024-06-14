import { Injectable } from '@angular/core';
import { BattleStats, People, PeopleFacade } from '@state/people';
import { Starship, StarshipsFacade } from '@state/starships';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { BattleType, GameOutcome, WinType } from './game-engine.model';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  private battleType = '';

  private peopleOpponents$ = new BehaviorSubject<{
    opponentOne: People | null;
    opponentTwo: People | null;
  }>({ opponentOne: null, opponentTwo: null });
  public peopleOpponentsObservable$: Observable<{
    opponentOne: People | null;
    opponentTwo: People | null;
  }> = this.peopleOpponents$.asObservable();

  private starshipOpponents$ = new BehaviorSubject<{
    opponentOne: Starship | null;
    opponentTwo: Starship | null;
  }>({ opponentOne: null, opponentTwo: null });
  public starshipOpponentsObservable$: Observable<{
    opponentOne: Starship | null;
    opponentTwo: Starship | null;
  }> = this.starshipOpponents$.asObservable();

  public winnerName$ = new BehaviorSubject<WinType>({ opponent: '', result: null });
  public winnerNameObservable$: Observable<WinType> = this.winnerName$.asObservable();

  private stats$: BattleStats[];

  constructor(
    private starshipFacade: StarshipsFacade,
    private peopleFacade: PeopleFacade
  ) {
    this.peopleFacade.allStats$.subscribe((stats) => (this.stats$ = stats));
  }

  public initialGame(params: string): void {
    this.battleType = params;
    this.resetOpponents();
    this.winnerName$.next({ opponent: '', result: null });
  }

  private resetOpponents(): void {
    this.peopleOpponents$.next({ opponentOne: null, opponentTwo: null });
    this.starshipOpponents$.next({ opponentOne: null, opponentTwo: null });
  }

  public getRandomOpponentIndex(facade: PeopleFacade | StarshipsFacade): Observable<number> {
    return facade.count$.pipe(switchMap((count) => of(Math.floor(Math.random() * count))));
  }

  private getRandomOpponent<T>(facade: PeopleFacade | StarshipsFacade, index: number): Observable<T> {
    return facade.selectByIndex(index) as Observable<T>;
  }

  public updateOrAddStats(entity: People | Starship, entityType: BattleType, outcome: GameOutcome): void {
    const facade = entityType === BattleType.People ? this.peopleFacade : this.starshipFacade;

    if (facade) {
      facade
        .selectStatsById(entity.id)
        .pipe(take(1))
        .subscribe((existingEntity: BattleStats) => {
          const updatedStats = this.calculateUpdatedStats(existingEntity, outcome);
          updatedStats.id = entity.id;
          updatedStats.name = entity.name;
          facade.setStats(updatedStats);
        });

      if (outcome !== GameOutcome.Loss) {
        this.winnerName$.next({ opponent: entity.name, result: outcome });
      }
    } else {
      throw new Error('Unknown entity type');
    }
  }

  private calculateUpdatedStats(existingStats: BattleStats, outcome: GameOutcome): BattleStats {
    return {
      id: existingStats.id,
      name: existingStats.name,
      loss: outcome === GameOutcome.Loss ? existingStats.loss + 1 : existingStats.loss,
      win: outcome === GameOutcome.Win ? existingStats.win + 1 : existingStats.win,
      tie: outcome === GameOutcome.Tie ? existingStats.tie + 1 : existingStats.tie,
    };
  }

  private assignOpponent<T>(
    facade: PeopleFacade | StarshipsFacade,
    opponents$: BehaviorSubject<{ opponentOne: T | null; opponentTwo: T | null }>,
    position: 'opponentOne' | 'opponentTwo'
  ): void {
    this.getRandomOpponentIndex(facade).subscribe((index) => {
      this.getRandomOpponent<T>(facade, index).subscribe((opponent) => {
        const currentOpponents = opponents$.getValue();
        opponents$.next({ ...currentOpponents, [position]: opponent });
      });
    });
  }

  public getRandomPeopleOpponent(position: 'opponentOne' | 'opponentTwo'): void {
    this.assignOpponent<People>(this.peopleFacade, this.peopleOpponents$, position);
    this.winnerName$.next({ opponent: '', result: null });
  }

  public getRandomStarshipOpponent(position: 'opponentOne' | 'opponentTwo'): void {
    this.assignOpponent<Starship>(this.starshipFacade, this.starshipOpponents$, position);
    this.winnerName$.next({ opponent: '', result: null });
  }

  public fight(): void {
    this.battleType === BattleType.People ? this.peopleFight() : this.starshipFight();
  }

  private peopleFight(): void {
    this.peopleOpponents$.pipe(take(1)).subscribe((opponents) => {
      if (!opponents.opponentOne || !opponents.opponentTwo) {
        console.error('Not enough opponents to fight.');
        return;
      }

      const result = this.resolveFight(opponents.opponentOne.mass, opponents.opponentTwo.mass);
      this.updateOrAddStats(opponents.opponentOne, BattleType.People, result.opponentOneOutcome);
      this.updateOrAddStats(opponents.opponentTwo, BattleType.People, result.opponentTwoOutcome);
      this.resetOpponents();
    });
  }

  private starshipFight(): void {
    this.starshipOpponents$.pipe(take(1)).subscribe((opponents) => {
      if (!opponents.opponentOne || !opponents.opponentTwo) {
        console.error('Not enough opponents to fight.');
        return;
      }

      const result = this.resolveFight(opponents.opponentOne.crew, opponents.opponentTwo.crew);
      this.updateOrAddStats(opponents.opponentOne, BattleType.Starship, result.opponentOneOutcome);
      this.updateOrAddStats(opponents.opponentTwo, BattleType.Starship, result.opponentTwoOutcome);
      this.resetOpponents();
    });
  }

  private resolveFight(
    statOne: number,
    statTwo: number
  ): {
    opponentOneOutcome: GameOutcome;
    opponentTwoOutcome: GameOutcome;
    updatedOpponents: { opponentOne: People | Starship | null; opponentTwo: People | Starship | null };
  } {
    let opponentOneOutcome: GameOutcome;
    let opponentTwoOutcome: GameOutcome;

    if (statOne > statTwo) {
      opponentOneOutcome = GameOutcome.Win;
      opponentTwoOutcome = GameOutcome.Loss;
    } else if (statOne < statTwo) {
      opponentOneOutcome = GameOutcome.Loss;
      opponentTwoOutcome = GameOutcome.Win;
    } else {
      opponentOneOutcome = GameOutcome.Tie;
      opponentTwoOutcome = GameOutcome.Tie;
    }

    const updatedOpponents = { opponentOne: null, opponentTwo: null };
    return { opponentOneOutcome, opponentTwoOutcome, updatedOpponents };
  }

  public getStats(id: string): Observable<BattleStats> {
    return id ? this.peopleFacade.selectStatsById(id) : of(null);
  }
}
