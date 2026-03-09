import { getTypeAdvantage } from "../services/types.service";
import type { Pokemon } from "../types/Pokemon";

export const getBaseStatTotal = (pokemon: Pokemon) =>
  pokemon.stats.reduce((total, s) => total + s.base_stat, 0);

export const comparePokemons = async (
  newPokemon: Pokemon,
  currentPokemon: Pokemon,
) => {
  const newTypes = newPokemon?.types.map((t) => t.type.name) || [];
  const currentTypes = currentPokemon?.types.map((t) => t.type.name) || [];
  const isTypeMatch = newTypes.some((t) => currentTypes.includes(t));

  if (isTypeMatch) {
    return { newWins: false, currentWins: false, isTypeMatch: true };
  }
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

  const newWins = currentPokemon.types.some((t) =>
    newAdvantages.includes(t.type.name),
  );
  const currentWins = newPokemon.types.some((t) =>
    currentAdvantages.includes(t.type.name),
  );

  return { newWins, currentWins, isTypeMatch };
};
