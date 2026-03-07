export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface Pokemon {
  name: string;
  sprite: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
}
