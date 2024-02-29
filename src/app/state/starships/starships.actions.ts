import { createAction, createActionGroup, props } from '@ngrx/store';
import { BattleStats } from '@state/people';
import { baseEvents } from '../utils/action-groups';
import { Starship } from './starships.model';

export const getListOfstarships = createActionGroup({
  source: '[Globals] Get Starships',
  events: {
    ...baseEvents,
  },
});

export const getSingleStarshipsPropertis = createActionGroup({
  source: '[Globals] Get Single Starships Propertis',
  events: {
    ...baseEvents,
    Request: props<{ id: string }>(),
    Success: props<{ starship: Starship[] }>(),
  },
});

export const updateBattleStatsAction = createAction('[Starship] Update Battle Stats', props<{ stats: BattleStats }>());
