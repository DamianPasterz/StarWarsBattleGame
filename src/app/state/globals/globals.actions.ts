import { createAction, props } from '@ngrx/store';
import * as peopleActions from '@state/people/people.actions';
import * as starshipActions from '@state/starships/starships.actions';

export const showLoading = createAction('[Globals] loading', props<{ loading: boolean }>());

export const actionsLoadingOn = [
  starshipActions.getListOfStarships.request,
  starshipActions.getSingleStarshipsProperties.request,
  peopleActions.getListOfPeople.request,
  peopleActions.getSinglePeopleProperties.request,
];

export const actionsLoadingOff = [
  starshipActions.getListOfStarships.success,
  starshipActions.getListOfStarships.failure,
  starshipActions.getSingleStarshipsProperties.success,
  starshipActions.getSingleStarshipsProperties.failure,
  peopleActions.getListOfPeople.success,
  peopleActions.getListOfPeople.failure,
  peopleActions.getSinglePeopleProperties.success,
  peopleActions.getSinglePeopleProperties.failure,
];
