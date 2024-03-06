import { createReducer, on } from '@ngrx/store';
import * as actions from '@state/planets/planets.actions';

import { Action } from '@ngrx/store';

import { PlanetsState, initialState } from './planets.model';

const reducer = createReducer(
  initialState,

  on(
    actions.getSinglePlanetPropertis.success,
    (state, { planets }): PlanetsState => ({
      ...state,
      planets: planets,
    })
  ),
  on(
    actions.updatePlanetsResidents,
    (state, { planets }): PlanetsState => ({
      ...state,
      planets: planets,
    })
  )
);

export function planetsReducer(state: PlanetsState | undefined, action: Action): PlanetsState {
  return reducer(state, action);
}
