import type { Pokemon, PokemonType } from "../types/Pokemon";

interface PokemonApiResponse {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

const BASE_URL = "https://pokeapi.co/api/v2";

export const getRandomPokemon = async (): Promise<Pokemon | null> => {
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
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
