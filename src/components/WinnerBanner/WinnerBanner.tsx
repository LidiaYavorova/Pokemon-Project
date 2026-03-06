import "./WinnerBanner.styles.css";

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
    winner === "New Pokemon wins"
      ? "new-wins"
      : winner === "Previous Pokemon wins"
        ? "prev-wins"
        : "no-advantage"
  }`;

  return <div className={className}>{winner.toUpperCase()}</div>;
}
