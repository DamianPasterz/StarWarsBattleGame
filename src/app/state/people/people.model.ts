export interface PeopleState {
  people: People[];
  stats: BattleStats[];
}

export const initialState: PeopleState = {
  people: [],
  // stats: [],
  stats: [
    {
      id: '29',
      name: 'Arvel Crynyd',
      loss: 0,
      win: 4,
      tie: 0,
    },
    {
      id: '1',
      name: 'Luke Skywalker',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '28',
      name: 'Mon Mothma',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '2',
      name: 'C-3PO',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '45',
      name: 'Bib Fortuna',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '29',
      name: 'Arvel Crynyd',
      loss: 0,
      win: 4,
      tie: 0,
    },
    {
      id: '1',
      name: 'Luke Skywalker',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '28',
      name: 'Mon Mothma',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '2',
      name: 'C-3PO',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '45',
      name: 'Bib Fortuna',
      loss: 1,
      win: 0,
      tie: 0,
    },
  ],
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
