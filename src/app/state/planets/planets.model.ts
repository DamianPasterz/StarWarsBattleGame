export interface PlanetsState {
  planets: Planet[];
}

export const initialState: PlanetsState = {
  planets: [],
};

export interface Residenst {
  name: string;
  id: string;
}

export interface Planet {
  id: string;
  name: string;
  population: number;
  url: string;
  residents: Residenst[];
}
