import { createReducer, on } from '@ngrx/store';
import * as actions from '@state/people/people.actions';

import { Action } from '@ngrx/store';

import { PeopleState, initialState } from './people.model';

const reducer = createReducer(
  initialState,

  on(
    actions.getSinglePeopleProperties.success,
    (state, { people }): PeopleState => ({
      ...state,
      people: people,
    })
  ),

  on(actions.updateBattleStatsAction, (state, { stats }): PeopleState => {
    const existingStatsIndex = state.stats.findIndex((s) => s.id === stats.id);

    if (existingStatsIndex >= 0) {
      const updatedStats = [...state.stats];
      updatedStats[existingStatsIndex] = {
        ...updatedStats[existingStatsIndex],
        ...stats,
      };
      return {
        ...state,
        stats: updatedStats,
      };
    } else {
      return {
        ...state,
        stats: [...state.stats, stats],
      };
    }
  })
);

export function peopleReducer(state: PeopleState | undefined, action: Action): PeopleState {
  return reducer(state, action);
}
