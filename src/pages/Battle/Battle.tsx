import { useCallback, useMemo, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Button from "../../components/ui/Button/Button";
import { getRandomPokemon } from "../../services/pokemon.service";
import type { Pokemon } from "../../types/Pokemon";
import "./Battle.css";
import StatBadge from "../../components/ui/StatBadge/StatBadge";
import WinnerBanner from "../../components/WinnerBanner/WinnerBanner";
import { WINNER } from "../../utils/constants";
import type { BattleResult, BattleStats } from "../../types/Battle";
import {
  comparePokemons,
  getBaseStatTotal,
} from "../../services/battle.service";

export default function Battle() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [previousPokemon, setPreviousPokemon] = useState<Pokemon | null>(null);
  const [strongestPokemon, setStrongestPokemon] = useState<Pokemon | null>(
    null,
  );
  const [pokemonsCounter, setPokemonsCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [battleStats, setBattleStats] = useState<BattleStats>({
    typeMatches: 0,
    newWins: 0,
    previousWins: 0,
  });

  const [battleResult, setBattleResult] = useState<BattleResult>({
    winner: "",
    isTypeMatch: false,
  });

  const strongestStatTotal = useMemo(() => {
    return strongestPokemon ? getBaseStatTotal(strongestPokemon) : 0;
  }, [strongestPokemon]);

  const generatePokemon = useCallback(async () => {
    setIsLoading(true);
    const newPokemon = await getRandomPokemon();

    if (!newPokemon) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setPokemonsCounter((prev) => prev + 1);

    if (newPokemon && currentPokemon && strongestPokemon) {
      const { newWins, currentWins, isTypeMatch } = await comparePokemons(
        newPokemon,
        currentPokemon,
      );
      setBattleResult({
        winner: newWins
          ? WINNER.NEW
          : currentWins
            ? WINNER.PREVIOUS
            : WINNER.NONE,
        isTypeMatch,
      });

      setBattleStats((prev) => ({
        typeMatches: isTypeMatch ? prev.typeMatches + 1 : prev.typeMatches,
        newWins: newWins ? prev.newWins + 1 : prev.newWins,
        previousWins: currentWins ? prev.previousWins + 1 : prev.previousWins,
      }));

      if (getBaseStatTotal(newPokemon) > strongestStatTotal) {
        setStrongestPokemon(newPokemon);
      }
    } else if (newPokemon) {
      setStrongestPokemon(newPokemon);
    }

    setPreviousPokemon(currentPokemon);
    setCurrentPokemon(newPokemon);
  }, [currentPokemon, strongestStatTotal, strongestPokemon]);

  return (
    <section className="container">
      <div className="battle-content">
        <h1>PokéDuel</h1>
        <div className="stats-row">
          <StatBadge label="Type Matches" count={battleStats.typeMatches} />
          <StatBadge label="New Wins" count={battleStats.newWins} />
          <StatBadge label="Prev Wins" count={battleStats.previousWins} />
        </div>
        <div className="pokemon-cards">
          <PokemonCard pokemon={previousPokemon} label="Previous" />
          <div className="vs-circle">VS</div>
          <PokemonCard pokemon={currentPokemon} label="Current" />
        </div>
        {currentPokemon && previousPokemon && (
          <WinnerBanner
            winner={battleResult.winner}
            isTypeMatch={battleResult.isTypeMatch}
          />
        )}
        <Button onClick={generatePokemon} disabled={isLoading}>
          {isLoading ? "Loading Pokémon" : "Generate Pokémon"}
        </Button>
        <p>Pokémon #{pokemonsCounter} loaded.</p>
      </div>
      <div className="strongest-card">
        <PokemonCard pokemon={strongestPokemon} label="Strongest" />
      </div>
    </section>
  );
}
