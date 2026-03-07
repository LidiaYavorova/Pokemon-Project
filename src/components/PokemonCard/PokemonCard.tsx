import type { Pokemon } from "../../types/Pokemon";
import TypeBadge from "../ui/TypeBadge/TypeBadge";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: Pokemon | null;
  label: string;
}

export default function PokemonCard({ pokemon, label }: PokemonCardProps) {
  const colorClass = label === "Previous" ? "#3B5BA7" : "#CC0000";

  return (
    <div className="pokemon-card">
      <h3 style={{ color: colorClass }}>{label}</h3>
      {pokemon ? (
        <>
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <img
            className="pokemon-sprite"
            src={pokemon.sprite}
            alt={pokemon.name}
          />
          <div className="pokemon-types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
          <p>Height: {(pokemon.height / 10).toFixed(1)}m</p>
          <p>Weight: {(pokemon.weight / 10).toFixed(1)}kg</p>
        </>
      ) : (
        <>
          <img src="src/assets/images/pokeball.png" alt="Pokeball" />
          <h2>No Pokémon yet</h2>
        </>
      )}
    </div>
  );
}
