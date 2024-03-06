import { createAction, createActionGroup, props } from '@ngrx/store';
import { baseEvents } from '../utils/action-groups';
import { Planet } from './planets.model';

export const getListOfPlanets = createActionGroup({
  source: '[Planets] Get Planets',
  events: {
    ...baseEvents,
  },
});

export const getSinglePlanetPropertis = createActionGroup({
  source: '[Planets] Get Single Planet Propertis',
  events: {
    ...baseEvents,
    Request: props<{ id: string }>(),
    Success: props<{ planets: Planet[] }>(),
  },
});

export const updatePlanetsResidents = createAction('[Planets] Update Residents', props<{ planets: Planet[] }>());
