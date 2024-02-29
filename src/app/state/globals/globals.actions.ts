import { createAction, props } from '@ngrx/store';
import * as peopleActions from '@state/people/people.actions';
import * as starshipActions from '@state/starships/starships.actions';

export const showLoading = createAction('[Globals] loading', props<{ loading: boolean }>());

export const actionsLoadingOn = [
  starshipActions.getListOfstarships.request,
  starshipActions.getSingleStarshipsPropertis.request,
  peopleActions.getListOfPeople.request,
  peopleActions.getSinglePeoplePropertis.request,
];

export const actionsLoadingOff = [
  starshipActions.getListOfstarships.success,
  starshipActions.getListOfstarships.failure,
  starshipActions.getSingleStarshipsPropertis.success,
  starshipActions.getSingleStarshipsPropertis.failure,
  peopleActions.getListOfPeople.success,
  peopleActions.getListOfPeople.failure,
  peopleActions.getSinglePeoplePropertis.success,
  peopleActions.getSinglePeoplePropertis.failure,
];
