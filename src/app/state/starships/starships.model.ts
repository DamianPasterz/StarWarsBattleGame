import { BattleStats } from '@state/people';

export interface StarshipsState {
  starships: Starship[];
  stats: BattleStats[];
}

export const initialState: StarshipsState = {
  starships: [],
  stats: [],
};

export interface Starship {
  id: string;
  manufacturer: string;
  crew: number;
  name: string;
}
