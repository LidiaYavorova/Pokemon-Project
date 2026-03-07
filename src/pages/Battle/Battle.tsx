import { useCallback, useState } from "react";
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
  const [typeMatches, setTypeMatches] = useState(0);
  const [newWins, setNewWins] = useState(0);
  const [previousWins, setPreviousWins] = useState(0);
  const [winner, setWinner] = useState("");
  const [pokemonsCounter, setPokemonsCounter] = useState(0);

  const [isTypeMatchBanner, setIsTypeMatchBanner] = useState(false);
  const [strongestPokemon, setStrongestPokemon] = useState<Pokemon | null>(
    null,
  );

  const getBaseStatTotal = (pokemon: Pokemon) =>
    pokemon.stats.reduce((total, s) => total + s.base_stat, 0);

  const comparePokemons = async (
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

    return { newWins, currentWins };
  };

  const generatePokemon = useCallback(async () => {
    const newPokemon = await getRandomPokemon();
    setPokemonsCounter((prev) => prev + 1);

    if (newPokemon && currentPokemon && strongestPokemon) {
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

      if (getBaseStatTotal(newPokemon) > getBaseStatTotal(strongestPokemon)) {
        setStrongestPokemon(newPokemon);
      }
    } else if (newPokemon) {
      setStrongestPokemon(newPokemon);
    }

    setPreviousPokemon(currentPokemon);
    setCurrentPokemon(newPokemon);
  }, [currentPokemon, strongestPokemon]);

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
