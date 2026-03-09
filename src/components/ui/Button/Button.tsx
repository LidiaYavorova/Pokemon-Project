import { memo } from "react";
import "./Button.css";
const Button = memo(function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} className="custom-button">
      {children}
    </button>
  );
});

export default Button;
