import "./Button.css";
export default function Button({
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
}
