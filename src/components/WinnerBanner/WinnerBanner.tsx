import { WINNER } from "../../utils/constants";
import "./WinnerBanner.css";

interface WinnerBannerProps {
  winner: string;
  isTypeMatch: boolean;
}

export default function WinnerBanner({
  winner,
  isTypeMatch,
}: WinnerBannerProps) {
  if (isTypeMatch) {
    return <div className="winner-banner type-match">TYPE MATCH!</div>;
  }
  const className = `winner-banner ${
    winner === WINNER.NEW
      ? "new-wins"
      : winner === WINNER.PREVIOUS
        ? "prev-wins"
        : "no-advantage"
  }`;

  return <div className={className}>{winner.toUpperCase()}</div>;
}
