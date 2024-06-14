export interface PeopleState {
  people: People[];
  stats: BattleStats[];
}

export const initialState: PeopleState = {
  people: [],
  stats: [],
};

export interface People {
  mass: number;
  name: string;
  homeworld: string;
  id: string;
}

export interface BattleStats {
  id: string;
  name: string;
  win: number;
  loss: number;
  tie: number;
}
