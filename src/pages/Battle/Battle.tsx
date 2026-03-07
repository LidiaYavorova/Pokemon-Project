import { useCallback, useMemo, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Button from "../../components/ui/Button/Button";
import { getRandomPokemon } from "../../services/pokemon.service";
import type { Pokemon } from "../../types/Pokemon";
import "./Battle.styles.css";
import StatBadge from "../../components/ui/StatBadge/StatBadge";
import WinnerBanner from "../../components/WinnerBanner/WinnerBanner";
import { comparePokemons, getBaseStatTotal } from "../../utils/helpers";

export default function Battle() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [previousPokemon, setPreviousPokemon] = useState<Pokemon | null>(null);
  const [typeMatches, setTypeMatches] = useState(0);
  const [newWins, setNewWins] = useState(0);
  const [previousWins, setPreviousWins] = useState(0);
  const [winner, setWinner] = useState("");
  const [pokemonsCounter, setPokemonsCounter] = useState(0);

  const [isTypeMatchBanner, setIsTypeMatchBanner] = useState(false);
  const [strongestPokemon, setStrongestPokemon] = useState<Pokemon | null>(
    null,
  );

  const strongestStatTotal = useMemo(() => {
    return strongestPokemon ? getBaseStatTotal(strongestPokemon) : 0;
  }, [strongestPokemon]);

  const generatePokemon = useCallback(async () => {
    const newPokemon = await getRandomPokemon();
    setPokemonsCounter((prev) => prev + 1);

    if (newPokemon && currentPokemon && strongestStatTotal !== 0) {
      const { newWins, currentWins } = await comparePokemons(
        newPokemon,
        currentPokemon,
      );

      const newTypes = newPokemon?.types.map((t) => t.type.name) || [];
      const currentTypes = currentPokemon?.types.map((t) => t.type.name) || [];
      const isTypeMatch = newTypes.some((t) => currentTypes.includes(t));

      setIsTypeMatchBanner(isTypeMatch);
      if (isTypeMatch) setTypeMatches((prev) => prev + 1);

      if (newWins) {
        setWinner("New Pokemon wins");
        setNewWins((prev) => prev + 1);
      } else if (currentWins) {
        setWinner("Previous Pokemon wins");
        setPreviousWins((prev) => prev + 1);
      } else {
        setWinner("No Advantage");
      }

      if (getBaseStatTotal(newPokemon) > strongestStatTotal) {
        setStrongestPokemon(newPokemon);
      }
    } else if (newPokemon) {
      setStrongestPokemon(newPokemon);
    }

    setPreviousPokemon(currentPokemon);
    setCurrentPokemon(newPokemon);
  }, [currentPokemon, strongestStatTotal]);

  return (
    <>
      <section className="container">
        <div className="battle-content">
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
            <WinnerBanner winner={winner} isTypeMatch={isTypeMatchBanner} />
          )}
          <Button onClick={generatePokemon}>Generate Pokémon</Button>
          <p>Pokémon #{pokemonsCounter} loaded.</p>
        </div>
        <div className="strongest-card">
          <PokemonCard pokemon={strongestPokemon} label="Strongest" />
        </div>
      </section>
    </>
  );
}
