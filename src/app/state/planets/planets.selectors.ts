import { createSelector } from '@ngrx/store';
import { AppState } from '@state/index';
import { Planet, PlanetsState } from './planets.model';

export const selectPlanets = (state: AppState): PlanetsState => state.planets;
export const selectAllPlanets = (state: AppState): Planet[] => state.planets.planets;

export const selectPeopleByIndex = (index: number) =>
  createSelector(selectPlanets, (planetsState: PlanetsState) => planetsState.planets[index]);

export const selectPeopleCount = createSelector(
  selectPlanets,
  (planetsState: PlanetsState) => planetsState.planets.length
);
