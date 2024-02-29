import { BattleStats } from '@state/people';

export interface StarshipsState {
  starships: StarshipProperties[];
  stats: BattleStats[];
}

export const initialState: StarshipsState = {
  starships: [],
  stats: [],
};

export interface StarshipProperties {
  id: string;
  manufacturer: string;
  crew: number;
  name: string;
}

export interface StarshipResult {
  properties: StarshipProperties;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface StarshipResponse {
  message: string;
  result: StarshipResult;
}

// respo
export interface StarshipsResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: StarshipListElement[];
}

interface StarshipListElement {
  uid: string;
  name: string;
  url: string;
}
