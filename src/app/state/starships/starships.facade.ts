import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BattleStats } from '@state/people';
import * as selectors from '@state/starships/starship.selectors';
import { AppState } from '..';
import * as actions from './starships.actions';

@Injectable({
  providedIn: 'root',
})
export class StarshipsFacade {
  public starship$ = this.store.select(selectors.selectStarship);
  public count$ = this.store.select(selectors.selectStarshipCount);
  public selectByIndex = (index: number) => this.store.select(selectors.selectStarshipByIndex(index));

  public selectStatsById = (id: string) => this.store.select(selectors.selectStarshipStatsById(id));
  constructor(private store: Store<AppState>) {}

  public getStarships(): void {
    this.store.dispatch(actions.getListOfstarships.request());
  }

  public setStats(stats: BattleStats): void {
    this.store.dispatch(actions.updateBattleStatsAction({ stats: stats }));
  }
}
