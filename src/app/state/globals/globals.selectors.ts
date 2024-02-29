import { createSelector } from '@ngrx/store';
import { AppState } from '@state/index';
import { GlobalsState } from './globals.model';

export const selectGlobalsState = (state: AppState): GlobalsState => state.globals;

export const selectLoading = createSelector(
  selectGlobalsState,
  (state: GlobalsState) => state.loading
);
