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

// export interface PeopleResult {
//   properties: PeopleProperties;
//   description: string;
//   _id: string;
//   uid: string;
//   __v: number;
// }

// export interface PeopleResponse {
//   message: string;
//   result: PeopleResult;
// }

// export interface StarWarsCharacterResponse {
//   message: string;
//   total_records: number;
//   total_pages: number;
//   previous: string | null;
//   next: string | null;
//   results: StarWarsCharacter[];
// }

// export interface StarWarsCharacter {
//   uid: string;
//   name: string;
//   url: string;
// }
