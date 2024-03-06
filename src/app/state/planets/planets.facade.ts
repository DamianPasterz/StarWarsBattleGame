import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '@state/planets/planets.selectors';
import { AppState } from '..';
import * as actions from './planets.actions';
@Injectable({
  providedIn: 'root',
})
export class PlanetsFacade {
  public planets$ = this.store.select(selectors.selectPlanets);
  public AllPlanets = this.store.select(selectors.selectAllPlanets);
  public selectByIndex = (index: number) => this.store.select(selectors.selectPeopleByIndex(index));

  // public selectStatsById = (id: string) => this.store.select(selectors.selectPeopleStatsById(id));

  constructor(private store: Store<AppState>) {}

  public getPlanets(): void {
    this.store.dispatch(actions.getListOfPlanets.request());
  }
}
