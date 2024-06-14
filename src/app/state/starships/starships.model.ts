import { BattleStats } from '@state/people';

export interface StarshipsState {
  starships: Starship[];
  stats: BattleStats[];
}

export const initialState: StarshipsState = {
  // starships: [],
  starships: [
    {
      id: '2',
      name: 'CR90 corvette',
      crew: 30,
      manufacturer: 'Corellian Engineering Corporation',
    },
    {
      id: '3',
      name: 'Star Destroyer',
      crew: 47,
      manufacturer: 'Kuat Drive Yards',
    },
    {
      id: '5',
      name: 'Sentinel-class landing craft',
      crew: 5,
      manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
    },
    {
      id: '9',
      name: 'Death Star',
      crew: 342,
      manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    },
    {
      id: '11',
      name: 'Y-wing',
      crew: 2,
      manufacturer: 'Koensayr Manufacturing',
    },
    {
      id: '10',
      name: 'Millennium Falcon',
      crew: 4,
      manufacturer: 'Corellian Engineering Corporation',
    },
    {
      id: '13',
      name: 'TIE Advanced x1',
      crew: 1,
      manufacturer: 'Sienar Fleet Systems',
    },
    {
      id: '15',
      name: 'Executor',
      crew: 279,
      manufacturer: 'Kuat Drive Yards, Fondor Shipyards',
    },
    {
      id: '12',
      name: 'X-wing',
      crew: 1,
      manufacturer: 'Incom Corporation',
    },
    {
      id: '17',
      name: 'Rebel transport',
      crew: 6,
      manufacturer: 'Gallofree Yards, Inc.',
    },
    {
      id: '21',
      name: 'Slave 1',
      crew: 1,
      manufacturer: 'Kuat Systems Engineering',
    },
    {
      id: '22',
      name: 'Imperial shuttle',
      crew: 6,
      manufacturer: 'Sienar Fleet Systems',
    },
    {
      id: '23',
      name: 'EF76 Nebulon-B escort frigate',
      crew: 854,
      manufacturer: 'Kuat Drive Yards',
    },
    {
      id: '28',
      name: 'A-wing',
      crew: 1,
      manufacturer: 'Alliance Underground Engineering, Incom Corporation',
    },
    {
      id: '27',
      name: 'Calamari Cruiser',
      crew: 5400,
      manufacturer: 'Mon Calamari shipyards',
    },
    {
      id: '29',
      name: 'B-wing',
      crew: 1,
      manufacturer: 'Slayn & Korpil',
    },
    {
      id: '31',
      name: 'Republic Cruiser',
      crew: 9,
      manufacturer: 'Corellian Engineering Corporation',
    },
    {
      id: '32',
      name: 'Droid control ship',
      crew: 175,
      manufacturer: 'Hoersch-Kessel Drive, Inc.',
    },
    {
      id: '39',
      name: 'Naboo fighter',
      crew: 1,
      manufacturer: 'Theed Palace Space Vessel Engineering Corps',
    },
    {
      id: '40',
      name: 'Naboo Royal Starship',
      crew: 8,
      manufacturer: 'Theed Palace Space Vessel Engineering Corps, Nubia Star Drives',
    },
    {
      id: '43',
      name: 'J-type diplomatic barge',
      crew: 5,
      manufacturer: 'Theed Palace Space Vessel Engineering Corps, Nubia Star Drives',
    },
    {
      id: '41',
      name: 'Scimitar',
      crew: 1,
      manufacturer: 'Republic Sienar Systems',
    },
    {
      id: '47',
      name: 'AA-9 Coruscant freighter',
      crew: 145,
      manufacturer: 'Botajef Shipyards',
    },
    {
      id: '48',
      name: 'Jedi starfighter',
      crew: 1,
      manufacturer: 'Kuat Systems Engineering',
    },
    {
      id: '52',
      name: 'Republic Assault ship',
      crew: 700,
      manufacturer: 'Rothana Heavy Engineering',
    },
    {
      id: '49',
      name: 'H-type Nubian yacht',
      crew: 4,
      manufacturer: 'Theed Palace Space Vessel Engineering Corps',
    },
    {
      id: '59',
      name: 'Trade Federation cruiser',
      crew: 600,
      manufacturer: 'Rendili StarDrive, Free Dac Volunteers Engineering corps.',
    },
    {
      id: '58',
      name: 'Solar Sailer',
      crew: 3,
      manufacturer: 'Huppla Pasa Tisc Shipwrights Collective',
    },
    {
      id: '61',
      name: 'Theta-class T-2c shuttle',
      crew: 5,
      manufacturer: 'Cygnus Spaceworks',
    },
    {
      id: '63',
      name: 'Republic attack cruiser',
      crew: 7400,
      manufacturer: 'Kuat Drive Yards, Allanteen Six shipyards',
    },
    {
      id: '64',
      name: 'Naboo star skiff',
      crew: 3,
      manufacturer: 'Theed Palace Space Vessel Engineering Corps/Nubia Star Drives, Incorporated',
    },
    {
      id: '65',
      name: 'Jedi Interceptor',
      crew: 1,
      manufacturer: 'Kuat Systems Engineering',
    },
    {
      id: '66',
      name: 'arc-170',
      crew: 3,
      manufacturer: 'Incom Corporation, Subpro Corporation',
    },
    {
      id: '68',
      name: 'Banking clan frigte',
      crew: 200,
      manufacturer: 'Hoersch-Kessel Drive, Inc, Gwori Revolutionary Industries',
    },
    {
      id: '74',
      name: 'Belbullab-22 starfighter',
      crew: 1,
      manufacturer: 'Feethan Ottraw Scalable Assemblies',
    },
    {
      id: '75',
      name: 'V-wing',
      crew: 1,
      manufacturer: 'Kuat Systems Engineering',
    },
  ],
  stats: [
    //   {
    //     id: '15',
    //     name: 'Executor',
    //     loss: 1,
    //     win: 11,
    //     tie: 0,
    //   },
    //   {
    //     id: '13',
    //     name: 'TIE Advanced x1',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '49',
    //     name: 'H-type Nubian yacht',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '64',
    //     name: 'Naboo star skiff',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '66',
    //     name: 'arc-170',
    //     loss: 3,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '40',
    //     name: 'Naboo Royal Starship',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '74',
    //     name: 'Belbullab-22 starfighter',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '75',
    //     name: 'V-wing',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '5',
    //     name: 'Sentinel-class landing craft',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '11',
    //     name: 'Y-wing',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '17',
    //     name: 'Rebel transport',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '39',
    //     name: 'Naboo fighter',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '59',
    //     name: 'Trade Federation cruiser',
    //     loss: 0,
    //     win: 5,
    //     tie: 0,
    //   },
    //   {
    //     id: '68',
    //     name: 'Banking clan frigte',
    //     loss: 3,
    //     win: 11,
    //     tie: 0,
    //   },
    //   {
    //     id: '10',
    //     name: 'Millennium Falcon',
    //     loss: 2,
    //     win: 2,
    //     tie: 0,
    //   },
    //   {
    //     id: '29',
    //     name: 'B-wing',
    //     loss: 3,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '41',
    //     name: 'Scimitar',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '48',
    //     name: 'Jedi starfighter',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '28',
    //     name: 'A-wing',
    //     loss: 2,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '43',
    //     name: 'J-type diplomatic barge',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '27',
    //     name: 'Calamari Cruiser',
    //     loss: 0,
    //     win: 3,
    //     tie: 2,
    //   },
    //   {
    //     id: '58',
    //     name: 'Solar Sailer',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '9',
    //     name: 'Death Star',
    //     loss: 1,
    //     win: 1,
    //     tie: 0,
    //   },
    //   {
    //     id: '63',
    //     name: 'Republic attack cruiser',
    //     loss: 0,
    //     win: 4,
    //     tie: 0,
    //   },
    //   {
    //     id: '65',
    //     name: 'Jedi Interceptor',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
    //   {
    //     id: '32',
    //     name: 'Droid control ship',
    //     loss: 1,
    //     win: 0,
    //     tie: 0,
    //   },
  ],
};

export interface Starship {
  id: string;
  manufacturer: string;
  crew: number;
  name: string;
}
