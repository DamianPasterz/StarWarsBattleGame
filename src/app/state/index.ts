import { GlobalsEffects, GlobalsFacade, GlobalsState, globalsReducer } from './globals';
import { PeopleEffects, peopleReducer } from './people';
import { PeopleState } from './people/people.model';
import { StarshipsEffects, StarshipsFacade, StarshipsState, starshipsReducer } from './starships';

export const reducer = {
  globals: globalsReducer,
  starships: starshipsReducer,
  people: peopleReducer,
};

export const effects = [GlobalsEffects, StarshipsEffects, PeopleEffects];

export const facades = [GlobalsFacade, StarshipsFacade, PeopleEffects];

export interface AppState {
  globals: GlobalsState;
  starships: StarshipsState;
  people: PeopleState;
}
