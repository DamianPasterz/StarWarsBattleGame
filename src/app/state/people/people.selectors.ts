import { MemoizedSelector, createSelector } from '@ngrx/store';
import { AppState } from '@state/index';
import { BattleStats, People, PeopleState } from './people.model';

export const selectPeople = (state: AppState): PeopleState => state.people;

export const selectPeopleByIndex = (index: number): MemoizedSelector<AppState, People> =>
  createSelector(selectPeople, (peopleState: PeopleState) => peopleState.people[index]);

export const selectPeopleCount = createSelector(selectPeople, (peopleState: PeopleState) => peopleState.people.length);
export const selectPeopleStats = createSelector(selectPeople, (peopleState: PeopleState) => peopleState.stats);

export const selectPeopleStatsById = (id: string): MemoizedSelector<AppState, BattleStats> =>
  createSelector(selectPeople, (peopleState: PeopleState) => {
    const person = peopleState.stats.find((stats) => stats.id === id);
    return person ? person : { id: id, name: '', win: 0, loss: 0, tie: 0 };
  });
