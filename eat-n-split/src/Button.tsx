
export default function Button({
  onClick, type = "button", children,
}: {
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
}) {
  return (
    <button className="button" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
