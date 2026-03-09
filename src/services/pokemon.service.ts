import type { Pokemon, PokemonStat, PokemonType } from "../types/Pokemon";
import { BASE_URL } from "../utils/constants";

interface PokemonApiResponse {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  stats: PokemonStat[];
}

export const getRandomPokemon = async (): Promise<Pokemon> => {
  const randomID = Math.floor(Math.random() * 1025) + 1;
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${randomID}`);
    if (!response.ok) {
      throw new Error("Failed to load Pokemon");
    }
    const data = (await response.json()) as PokemonApiResponse;
    return {
      name: data.name,
      sprite: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      types: data.types,
      stats: data.stats,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load Pokémon. Please try again.");
  }
};
