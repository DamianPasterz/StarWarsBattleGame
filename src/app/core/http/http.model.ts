export interface BaseResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
}

export interface Response extends BaseResponse {
  results: ElementList[];
}

export interface ElementList {
  uid: string;
  name: string;
  url: string;
}

export interface BaseResult {
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface StarshipResult extends BaseResult {
  properties: StarshipProperties;
}

export interface PeopleResult extends BaseResult {
  properties: PeopleProperties;
}
export interface PlanetsResult extends BaseResult {
  properties: PlanetProperties;
}

export interface StarshipResponse {
  message: string;
  result: StarshipResult;
}
export interface PlanetResponse {
  message: string;
  result: PlanetsResult;
}

export interface StarshipProperties {
  manufacturer: string;
  crew: number;
  name: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  max_atmosphering_speed: string;
  model: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

export interface PeopleProperties {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface PlanetProperties {
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  created: string;
  edited: string;
  name: string;
  url: string;
}

export interface PeopleResponse {
  message: string;
  result: PeopleResult;
}
