import { createSelector } from '@ngrx/store';

import { AppState } from '@state/index';
import { StarshipsState } from './starships.model';

export const selectStarship = (state: AppState): StarshipsState => state.starships;

export const selectStarshipByIndex = (index: number) =>
  createSelector(selectStarship, (starshipState: StarshipsState) => starshipState.starships[index]);

export const selectStarshipCount = createSelector(selectStarship, (state) => state.starships.length);

export const selectStarshipStatsById = (id: string) =>
  createSelector(selectStarship, (starshipState: StarshipsState) => {
    const starship = starshipState.stats.find((stats) => stats.id === id);
    return starship ? starship : { id: id, name: '', win: 0, loss: 0, tie: 0 };
  });
