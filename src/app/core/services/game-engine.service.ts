import { Injectable } from '@angular/core';
import { BattleStats, PeopleFacade, PeopleProperties } from '@state/people';
import { StarshipProperties, StarshipsFacade } from '@state/starships';
import { BehaviorSubject, Observable, of, switchMap, take } from 'rxjs';

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

  public winnerName$ = new BehaviorSubject<string>('');

  public winnerNameObservable$: Observable<string> = this.winnerName$.asObservable();

  constructor(
    private starshipFacade: StarshipsFacade,
    private peopleFacade: PeopleFacade
  ) {}

  public initialGame(params: string): void {
    console.log(' service', params);
    this.battleType = params;
    this.winnerName$.next('');
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
    entityType: 'people' | 'starship',
    outcome: 'win' | 'loss' | 'tie'
  ): void {
    let facade: PeopleFacade | StarshipsFacade;
    if (entityType === 'people') {
      facade = this.peopleFacade;
    } else if (entityType === 'starship') {
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
    if (outcome === 'win' || outcome === 'tie') {
      this.winnerName$.next(entity.name);
    }
  }

  private calculateUpdatedStats(existingStats: any, outcome: 'win' | 'loss' | 'tie'): BattleStats {
    return {
      id: existingStats.id,
      name: existingStats.name,
      loss: outcome === 'loss' ? existingStats.loss + 1 : existingStats.loss,
      win: outcome === 'win' ? existingStats.win + 1 : existingStats.win,
      tie: outcome === 'tie' ? existingStats.tie + 1 : existingStats.tie,
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
        } else {
          console.error('Both opponents are already assigned.');
        }
      });
    });
    this.winnerName$.next('');
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
    this.winnerName$.next('');
  }

  public fight(): void {
    console.log(this.battleType, 'fight');
    this.battleType === 'people' ? this.peopleFight() : this.starshipFight();
  }

  private peopleFight(): void {
    this.peopleOponents$.pipe(take(1)).subscribe((opponents) => {
      if (!opponents.oponentOne || !opponents.oponentTwo) {
        console.error('Not enough opponents to fight.');
        return;
      }

      if (opponents.oponentOne.mass > opponents.oponentTwo.mass) {
        this.updateOrAddStats(opponents.oponentOne, 'people', 'win');
        this.updateOrAddStats(opponents.oponentTwo, 'people', 'loss');
        this.peopleOponents$.next({ oponentOne: opponents.oponentOne, oponentTwo: null });
      } else if (opponents.oponentOne.mass < opponents.oponentTwo.mass) {
        this.updateOrAddStats(opponents.oponentTwo, 'people', 'win');
        this.updateOrAddStats(opponents.oponentOne, 'people', 'loss');
        this.peopleOponents$.next({ oponentOne: null, oponentTwo: opponents.oponentTwo });
      } else {
        console.log("It's a tie!");
        this.updateOrAddStats(opponents.oponentOne, 'people', 'tie');
        this.updateOrAddStats(opponents.oponentTwo, 'people', 'tie');
        this.peopleOponents$.next({ oponentOne: null, oponentTwo: null });
      }
    });
  }

  private starshipFight(): void {
    this.starshipOponents$.pipe(take(1)).subscribe((opponents) => {
      console.log('fdfsdfg', opponents);
      if (!opponents.oponentOne || !opponents.oponentTwo) {
        console.error('Not enough opponents to fight.');
        return;
      }

      if (opponents.oponentOne.crew > opponents.oponentTwo.crew) {
        this.updateOrAddStats(opponents.oponentOne, 'starship', 'win');
        this.updateOrAddStats(opponents.oponentTwo, 'starship', 'loss');
        this.starshipOponents$.next({ oponentOne: opponents.oponentOne, oponentTwo: null });
      } else if (opponents.oponentOne.crew < opponents.oponentTwo.crew) {
        this.updateOrAddStats(opponents.oponentTwo, 'starship', 'win');
        this.updateOrAddStats(opponents.oponentOne, 'starship', 'loss');
        this.starshipOponents$.next({ oponentOne: null, oponentTwo: opponents.oponentTwo });
      } else {
        console.log("It's a tie!");
        this.updateOrAddStats(opponents.oponentOne, 'starship', 'tie');
        this.updateOrAddStats(opponents.oponentTwo, 'starship', 'tie');
        this.starshipOponents$.next({ oponentOne: null, oponentTwo: null });
      }
    });
  }
}
