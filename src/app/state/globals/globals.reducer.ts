import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './globals.actions';
import { GlobalsState, initialState } from './globals.model';

const reducer = createReducer(
  initialState,
  on(actions.showLoading, (state, { loading }): GlobalsState => ({ ...state, loading }))
);

export function globalsReducer(state: GlobalsState | undefined, action: Action): GlobalsState {
  return reducer(state, action);
}
