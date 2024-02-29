import { createReducer, on } from '@ngrx/store';
import * as actions from '@state/starships/starships.actions';

import { Action } from '@ngrx/store';
import { StarshipsState, initialState } from './starships.model';

const reducer = createReducer(
  initialState,

  on(
    actions.getSingleStarshipsPropertis.success,
    (state, { starship }): StarshipsState => ({
      ...state,
      starships: starship,
    })
  ),

  on(actions.updateBattleStatsAction, (state, { stats }): StarshipsState => {
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

export function starshipsReducer(state: StarshipsState | undefined, action: Action): StarshipsState {
  return reducer(state, action);
}
