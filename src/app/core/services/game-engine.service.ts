import { Injectable } from '@angular/core';
import { BattleStats, PeopleFacade, PeopleProperties } from '@state/people';
import { StarshipProperties, StarshipsFacade } from '@state/starships';
import { BehaviorSubject, Observable, of, switchMap, take } from 'rxjs';
import { BattleType, GameOutcome, WinType } from './game-engine.model';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  private battleType: string = '';

  private peopleOponents$ = new BehaviorSubject<{
    oponentOne: PeopleProperties | null;
    oponentTwo: PeopleProperties | null;
  }>({ oponentOne: null, oponentTwo: null });
  public peopleOponentsObservable$: Observable<{
    oponentOne: PeopleProperties | null;
    oponentTwo: PeopleProperties | null;
  }> = this.peopleOponents$.asObservable();

  private starshipOponents$ = new BehaviorSubject<{
    oponentOne: StarshipProperties | null;
    oponentTwo: StarshipProperties | null;
  }>({ oponentOne: null, oponentTwo: null });
  public starshipOponentsObservable$: Observable<{
    oponentOne: StarshipProperties | null;
    oponentTwo: StarshipProperties | null;
  }> = this.starshipOponents$.asObservable();

  public winnerName$ = new BehaviorSubject<WinType>({ opponent: '', resault: null });

  public winnerNameObservable$: Observable<WinType> = this.winnerName$.asObservable();

  constructor(
    private starshipFacade: StarshipsFacade,
    private peopleFacade: PeopleFacade
  ) {}

  public initialGame(params: string): void {
    this.battleType = params;
    this.winnerName$.next({ opponent: '', resault: null });
    this.peopleOponents$.next({ oponentOne: null, oponentTwo: null });
    this.starshipOponents$.next({ oponentOne: null, oponentTwo: null });
  }

  public getRandomOpponentIndex(facade: PeopleFacade | StarshipsFacade): Observable<number> {
    return facade.count$.pipe(
      switchMap((count) => {
        const index = Math.floor(Math.random() * count);
        return of(index);
      })
    );
  }

  private getRandomOpponent<T>(facade: PeopleFacade | StarshipsFacade, index: number): Observable<T> {
    if (facade instanceof PeopleFacade) {
      return facade.selectByIndex(index) as Observable<T>;
    } else if (facade instanceof StarshipsFacade) {
      return facade.selectByIndex(index) as Observable<T>;
    } else {
      throw new Error('Unknown facade type');
    }
  }

  public updateOrAddStats(
    entity: PeopleProperties | StarshipProperties,
    entityType: BattleType,
    outcome: GameOutcome
  ): void {
    let facade: PeopleFacade | StarshipsFacade;
    if (entityType === BattleType.People) {
      facade = this.peopleFacade;
    } else if (entityType === BattleType.Starship) {
      facade = this.starshipFacade;
    }

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
    } else {
      console.error('Unknown entity type');
    }
    if (outcome === GameOutcome.Win) {
      this.winnerName$.next({ opponent: entity.name, resault: GameOutcome.Win });
    }
    if (outcome === GameOutcome.Tie) {
      this.winnerName$.next({ opponent: entity.name, resault: GameOutcome.Tie });
    }
  }

  private calculateUpdatedStats(existingStats: any, outcome: GameOutcome): BattleStats {
    return {
      id: existingStats.id,
      name: existingStats.name,
      loss: outcome === GameOutcome.Loss ? existingStats.loss + 1 : existingStats.loss,
      win: outcome === GameOutcome.Win ? existingStats.win + 1 : existingStats.win,
      tie: outcome === GameOutcome.Tie ? existingStats.tie + 1 : existingStats.tie,
    };
  }

  public getRandomPeopleOpponent(): void {
    this.getRandomOpponentIndex(this.peopleFacade).subscribe((index) => {
      this.getRandomOpponent<PeopleProperties>(this.peopleFacade, index).subscribe((person) => {
        const currentOpponents = this.peopleOponents$.getValue();
        if (currentOpponents.oponentOne === null) {
          this.peopleOponents$.next({ ...currentOpponents, oponentOne: person });
        } else if (currentOpponents.oponentTwo === null) {
          this.peopleOponents$.next({ ...currentOpponents, oponentTwo: person });
        }
      });
    });
    this.winnerName$.next({ opponent: '', resault: null });
  }

  public getRandomStarshipOpponent(): void {
    this.getRandomOpponentIndex(this.starshipFacade).subscribe((index) => {
      this.getRandomOpponent<StarshipProperties>(this.starshipFacade, index).subscribe((starship) => {
        const currentOpponents = this.starshipOponents$.getValue();
        if (currentOpponents.oponentOne === null) {
          this.starshipOponents$.next({ ...currentOpponents, oponentOne: starship });
        } else if (currentOpponents.oponentTwo === null) {
          this.starshipOponents$.next({ ...currentOpponents, oponentTwo: starship });
        } else {
          console.error('Both opponents are already assigned.');
        }
      });
    });
    this.winnerName$.next({ opponent: '', resault: null });
  }

  public fight(): void {
    this.battleType === BattleType.People ? this.peopleFight() : this.starshipFight();
  }

  private peopleFight(): void {
    this.peopleOponents$.pipe(take(1)).subscribe((opponents) => {
      if (!opponents.oponentOne || !opponents.oponentTwo) {
        console.error('Not enough opponents to fight.');
        return;
      }

      if (opponents.oponentOne.mass > opponents.oponentTwo.mass) {
        this.updateOrAddStats(opponents.oponentOne, BattleType.People, GameOutcome.Win);
        this.updateOrAddStats(opponents.oponentTwo, BattleType.People, GameOutcome.Loss);
        this.peopleOponents$.next({ oponentOne: opponents.oponentOne, oponentTwo: null });
      } else if (opponents.oponentOne.mass < opponents.oponentTwo.mass) {
        this.updateOrAddStats(opponents.oponentTwo, BattleType.People, GameOutcome.Win);
        this.updateOrAddStats(opponents.oponentOne, BattleType.People, GameOutcome.Loss);
        this.peopleOponents$.next({ oponentOne: null, oponentTwo: opponents.oponentTwo });
      } else {
        this.updateOrAddStats(opponents.oponentOne, BattleType.People, GameOutcome.Tie);
        this.updateOrAddStats(opponents.oponentTwo, BattleType.People, GameOutcome.Tie);
        this.peopleOponents$.next({ oponentOne: null, oponentTwo: null });
      }
    });
  }

  private starshipFight(): void {
    this.starshipOponents$.pipe(take(1)).subscribe((opponents) => {
      if (!opponents.oponentOne || !opponents.oponentTwo) {
        console.error('Not enough opponents to fight.');
        return;
      }

      if (opponents.oponentOne.crew > opponents.oponentTwo.crew) {
        this.updateOrAddStats(opponents.oponentOne, BattleType.Starship, GameOutcome.Win);
        this.updateOrAddStats(opponents.oponentTwo, BattleType.Starship, GameOutcome.Loss);
        this.starshipOponents$.next({ oponentOne: opponents.oponentOne, oponentTwo: null });
      } else if (opponents.oponentOne.crew < opponents.oponentTwo.crew) {
        this.updateOrAddStats(opponents.oponentTwo, BattleType.Starship, GameOutcome.Win);
        this.updateOrAddStats(opponents.oponentOne, BattleType.Starship, GameOutcome.Loss);
        this.starshipOponents$.next({ oponentOne: null, oponentTwo: opponents.oponentTwo });
      } else {
        this.updateOrAddStats(opponents.oponentOne, BattleType.Starship, GameOutcome.Tie);
        this.updateOrAddStats(opponents.oponentTwo, BattleType.Starship, GameOutcome.Tie);
        this.starshipOponents$.next({ oponentOne: null, oponentTwo: null });
      }
    });
  }
}
