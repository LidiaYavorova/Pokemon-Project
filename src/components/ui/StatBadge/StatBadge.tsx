import "./StatBadge.styles.css";

interface StatBadgeProps {
  label: string;
  count: number;
}

export default function StatBadge({ label, count }: StatBadgeProps) {
  return (
    <span className="stat-badge">
      {label}: {count}
    </span>
  );
}
