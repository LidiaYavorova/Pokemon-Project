import { useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Button from "../../components/ui/Button/Button";
import { getRandomPokemon } from "../../services/pokemon.service";
import type { Pokemon } from "../../types/Pokemon";
import "./Battle.styles.css";

export default function Battle() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const generatePokemon = () => {
    getRandomPokemon().then((pokemon) => {
      setPokemon(pokemon);
    });
  };
  return (
    <section className="battle-container">
      <PokemonCard pokemon={pokemon} />
      <Button onClick={generatePokemon}>Generate Pokémon</Button>
    </section>
  );
}
