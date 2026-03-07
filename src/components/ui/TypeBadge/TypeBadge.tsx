import { TYPE_COLORS } from "../../../utils/constants";
import "./TypeBadge.css";

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  const backgroundColor = TYPE_COLORS[type.toLowerCase()] ?? "#777";

  return (
    <span className="type-badge" style={{ backgroundColor }}>
      {type}
    </span>
  );
}
