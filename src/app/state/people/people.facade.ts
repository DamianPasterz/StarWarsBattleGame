import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '@state/people/people.selectors';
import { Observable } from 'rxjs';
import { AppState } from '..';
import * as actions from './people.actions';
import { BattleStats, People } from './people.model';
@Injectable({
  providedIn: 'root',
})
export class PeopleFacade {
  public people$ = this.store.select(selectors.selectPeople);
  public allStats$ = this.store.select(selectors.selectPeopleStats);
  public count$ = this.store.select(selectors.selectPeopleCount);
  public selectByIndex = (index: number): Observable<People> => this.store.select(selectors.selectPeopleByIndex(index));

  public selectStatsById = (id: string): Observable<BattleStats> =>
    this.store.select(selectors.selectPeopleStatsById(id));

  constructor(private store: Store<AppState>) {}

  public getPeople(): void {
    this.store.dispatch(actions.getListOfPeople.request());
  }

  public setStats(stats: BattleStats): void {
    this.store.dispatch(actions.updateBattleStatsAction({ stats: stats }));
  }
}
