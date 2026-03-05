export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  sprite: string;
  height: number;
  weight: number;
  types: PokemonType[];
}
