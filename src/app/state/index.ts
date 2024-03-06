import { GlobalsEffects, GlobalsFacade, GlobalsState, globalsReducer } from './globals';
import { PeopleEffects, PeopleFacade, peopleReducer } from './people';
import { PeopleState } from './people/people.model';
import { PlanetsEffects, PlanetsFacade, PlanetsState, planetsReducer } from './planets';
import { StarshipsEffects, StarshipsFacade, StarshipsState, starshipsReducer } from './starships';

export const reducer = {
  globals: globalsReducer,
  starships: starshipsReducer,
  people: peopleReducer,
  planets: planetsReducer,
};

export const effects = [GlobalsEffects, StarshipsEffects, PeopleEffects, PlanetsEffects];

export const facades = [GlobalsFacade, StarshipsFacade, PeopleFacade, PlanetsFacade];

export interface AppState {
  globals: GlobalsState;
  starships: StarshipsState;
  people: PeopleState;
  planets: PlanetsState;
}
