import { useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Button from "../../components/ui/Button/Button";
import { getRandomPokemon } from "../../services/pokemon.service";
import type { Pokemon } from "../../types/Pokemon";
import "./Battle.styles.css";

export default function Battle() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [previousPokemon, setPreviousPokemon] = useState<Pokemon | null>(null);

  const generatePokemon = () => {
    getRandomPokemon().then((newPokemon) => {
      setPreviousPokemon(pokemon);
      setPokemon(newPokemon);
    });
  };
  return (
    <section className="battle-container">
      <h1>PokéDuel</h1>
      <div className="pokemon-cards">
        <PokemonCard pokemon={previousPokemon} label="Previous" />
        <PokemonCard pokemon={pokemon} label="Current" />
      </div>
      <Button onClick={generatePokemon}>Generate Pokémon</Button>
    </section>
  );
}
