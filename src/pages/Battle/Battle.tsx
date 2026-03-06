import { useCallback, useEffect, useMemo, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Button from "../../components/ui/Button/Button";
import { getRandomPokemon } from "../../services/pokemon.service";
import type { Pokemon } from "../../types/Pokemon";
import "./Battle.styles.css";
import { getTypeAdvantage } from "../../services/types.service";
import StatBadge from "../../components/ui/StatBadge/StatBadge";
import WinnerBanner from "../../components/WinnerBanner/WinnerBanner";

export default function Battle() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [previousPokemon, setPreviousPokemon] = useState<Pokemon | null>(null);
  const [currentTypeAdvantage, setCurrentTypeAdvantage] = useState<string[]>(
    [],
  );
  const [previousTypeAdvantage, setPreviousTypeAdvantage] = useState<string[]>(
    [],
  );
  const currentTypes = currentPokemon?.types.map((t) => t.type.name) || [];
  const previousTypes = previousPokemon?.types.map((t) => t.type.name) || [];
  const isTypeMatch = currentTypes.some((t) => previousTypes.includes(t));

  const [typeMatches, setTypeMatches] = useState(0);
  const [newWins, setNewWins] = useState(0);
  const [previousWins, setPreviousWins] = useState(0);

  const [pokemonsCounter, setPokemonsCounter] = useState(0);

  const winner = useMemo(() => {
    if (
      currentPokemon?.types.some((t) =>
        previousTypeAdvantage.includes(t.type.name),
      )
    ) {
      return "Previous Pokemon wins";
    }

    if (
      previousPokemon?.types.some((t) =>
        currentTypeAdvantage.includes(t.type.name),
      )
    ) {
      return "New Pokemon wins";
    }

    return "No Advantage";
  }, [
    previousTypeAdvantage,
    currentTypeAdvantage,
    currentPokemon,
    previousPokemon,
  ]);

  useEffect(() => {
    if (currentPokemon) {
      const advantages = currentPokemon.types.map((t) =>
        getTypeAdvantage(t.type.name),
      );
      Promise.all(advantages).then((results) => {
        const flatAdvantages = results.flat();
        setCurrentTypeAdvantage(flatAdvantages);
      });
    }
  }, [currentPokemon]);

  useEffect(() => {
    if (previousPokemon) {
      const advantages = previousPokemon.types.map((t) =>
        getTypeAdvantage(t.type.name),
      );
      Promise.all(advantages).then((results) => {
        const flatAdvantages = results.flat();
        setPreviousTypeAdvantage(flatAdvantages);
      });
    }
  }, [previousPokemon]);

  const generatePokemon = useCallback(() => {
    if (currentPokemon && previousPokemon) {
      if (isTypeMatch) {
        setTypeMatches((prev) => prev + 1);
      }
      if (winner === "New Pokemon wins") {
        setNewWins((prev) => prev + 1);
      } else if (winner === "Previous Pokemon wins") {
        setPreviousWins((prev) => prev + 1);
      }
    }
    setPokemonsCounter((prev) => prev + 1);
    getRandomPokemon().then((newPokemon) => {
      setPreviousPokemon(currentPokemon);
      setCurrentPokemon(newPokemon);
    });
  }, [currentPokemon, previousPokemon, winner, isTypeMatch]);

  return (
    <section className="battle-container">
      <h1>PokéDuel</h1>
      <div className="stats-row">
        <StatBadge label="Type Matches" count={typeMatches} />
        <StatBadge label="New Wins" count={newWins} />
        <StatBadge label="Prev Wins" count={previousWins} />
      </div>
      <div className="pokemon-cards">
        <PokemonCard pokemon={previousPokemon} label="Previous" />
        <div className="vs-circle">VS</div>
        <PokemonCard pokemon={currentPokemon} label="Current" />
      </div>
      {currentPokemon && previousPokemon && (
        <WinnerBanner winner={winner} isTypeMatch={isTypeMatch} />
      )}
      <Button onClick={generatePokemon}>Generate Pokémon</Button>
      <p>Pokémon #{pokemonsCounter} loaded.</p>
    </section>
  );
}
