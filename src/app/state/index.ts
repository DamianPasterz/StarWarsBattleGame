import { GlobalsEffects, GlobalsFacade, GlobalsState, globalsReducer } from './globals';
import { PeopleEffects, PeopleFacade, peopleReducer } from './people';
import { PeopleState } from './people/people.model';
import { StarshipsEffects, StarshipsFacade, StarshipsState, starshipsReducer } from './starships';

export const reducer = {
  globals: globalsReducer,
  starships: starshipsReducer,
  people: peopleReducer,
};

export const effects = [GlobalsEffects, StarshipsEffects, PeopleEffects];

export const facades = [GlobalsFacade, StarshipsFacade, PeopleFacade];

export interface AppState {
  globals: GlobalsState;
  starships: StarshipsState;
  people: PeopleState;
}
