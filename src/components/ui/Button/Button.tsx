import { memo } from "react";
import "./Button.css";
const Button = memo(function Button({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button onClick={onClick} className="custom-button" disabled={disabled}>
      {children}
    </button>
  );
});

export default Button;
