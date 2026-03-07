export interface BattleStats {
  typeMatches: number;
  newWins: number;
  previousWins: number;
}

export interface BattleResult {
  winner: string;
  isTypeMatch: boolean;
}
