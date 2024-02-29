import { createAction, createActionGroup, props } from '@ngrx/store';
import { baseEvents } from '../utils/action-groups';
import { BattleStats, People } from './people.model';

export const getListOfPeople = createActionGroup({
  source: '[People] Get People',
  events: {
    ...baseEvents,
  },
});

export const getSinglePeoplePropertis = createActionGroup({
  source: '[People] Get Single People Propertis',
  events: {
    ...baseEvents,
    Request: props<{ id: string }>(),
    Success: props<{ people: People[] }>(),
  },
});

export const updateBattleStatsAction = createAction('[People] Update Battle Stats', props<{ stats: BattleStats }>());
