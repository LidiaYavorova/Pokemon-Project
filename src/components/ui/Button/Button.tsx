import "./Button.styles.css";
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
