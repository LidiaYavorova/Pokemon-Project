import { getTypeAdvantage } from "../services/types.service";
import type { Pokemon } from "../types/Pokemon";

export const getBaseStatTotal = (pokemon: Pokemon) =>
  pokemon.stats.reduce((total, s) => total + s.base_stat, 0);

export const comparePokemons = async (
  newPokemon: Pokemon,
  currentPokemon: Pokemon,
) => {
  const newAdvantages = (
    await Promise.all(
      newPokemon.types.map((t) => getTypeAdvantage(t.type.name)),
    )
  ).flat();

  const currentAdvantages = (
    await Promise.all(
      currentPokemon.types.map((t) => getTypeAdvantage(t.type.name)),
    )
  ).flat();

  const newWins = newPokemon.types.some((t) =>
    newAdvantages.includes(t.type.name),
  );
  const currentWins = currentPokemon.types.some((t) =>
    currentAdvantages.includes(t.type.name),
  );

  const newTypes = newPokemon?.types.map((t) => t.type.name) || [];
  const currentTypes = currentPokemon?.types.map((t) => t.type.name) || [];
  const isTypeMatch = newTypes.some((t) => currentTypes.includes(t));

  return { newWins, currentWins, isTypeMatch };
};
