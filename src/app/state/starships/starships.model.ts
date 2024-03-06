import { BattleStats } from '@state/people';

export interface StarshipsState {
  starships: Starship[];
  stats: BattleStats[];
}

export const initialState: StarshipsState = {
  starships: [],
  stats: [
    {
      id: '15',
      name: 'Executor',
      loss: 1,
      win: 11,
      tie: 0,
    },
    {
      id: '13',
      name: 'TIE Advanced x1',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '49',
      name: 'H-type Nubian yacht',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '64',
      name: 'Naboo star skiff',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '66',
      name: 'arc-170',
      loss: 3,
      win: 0,
      tie: 0,
    },
    {
      id: '40',
      name: 'Naboo Royal Starship',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '74',
      name: 'Belbullab-22 starfighter',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '75',
      name: 'V-wing',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '5',
      name: 'Sentinel-class landing craft',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '11',
      name: 'Y-wing',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '17',
      name: 'Rebel transport',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '39',
      name: 'Naboo fighter',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '59',
      name: 'Trade Federation cruiser',
      loss: 0,
      win: 5,
      tie: 0,
    },
    {
      id: '68',
      name: 'Banking clan frigte',
      loss: 3,
      win: 11,
      tie: 0,
    },
    {
      id: '10',
      name: 'Millennium Falcon',
      loss: 2,
      win: 2,
      tie: 0,
    },
    {
      id: '29',
      name: 'B-wing',
      loss: 3,
      win: 0,
      tie: 0,
    },
    {
      id: '41',
      name: 'Scimitar',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '48',
      name: 'Jedi starfighter',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '28',
      name: 'A-wing',
      loss: 2,
      win: 0,
      tie: 0,
    },
    {
      id: '43',
      name: 'J-type diplomatic barge',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '27',
      name: 'Calamari Cruiser',
      loss: 0,
      win: 3,
      tie: 2,
    },
    {
      id: '58',
      name: 'Solar Sailer',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '9',
      name: 'Death Star',
      loss: 1,
      win: 1,
      tie: 0,
    },
    {
      id: '63',
      name: 'Republic attack cruiser',
      loss: 0,
      win: 4,
      tie: 0,
    },
    {
      id: '65',
      name: 'Jedi Interceptor',
      loss: 1,
      win: 0,
      tie: 0,
    },
    {
      id: '32',
      name: 'Droid control ship',
      loss: 1,
      win: 0,
      tie: 0,
    },
  ],
};

export interface Starship {
  id: string;
  manufacturer: string;
  crew: number;
  name: string;
}
