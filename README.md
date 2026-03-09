# PokéDuel

A React + TypeScript battle app that fetches random Pokémon from the PokéAPI and compares them based on type advantages and base stats.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

    git clone <repository-url>
    cd pokemon-project
    npm install
    npm run dev

---

## How It Works

1. Click **Generate Pokémon** to fetch a random Pokémon from a pool of 1,025
2. The new Pokémon becomes **Current**, the previous one becomes **Previous**
3. The app compares them using type advantage data from PokéAPI:
   - If they share a type — TYPE MATCH, no winner declared
   - Otherwise — the Pokémon whose type deals double damage to the opponent wins
4. Battle statistics (type matches, new wins, previous wins) are updated after each generation
5. The **Strongest** Pokémon — the one with the highest base stat total — is tracked separately throughout the session

---

## Type Advantage Comparison

1. Check for shared types first — early return, no API calls needed
2. Fetch type advantages for both Pokémon concurrently using Promise.all
3. Check if newPokemon's advantages include currentPokemon's types
4. Check if currentPokemon's advantages include newPokemon's types
