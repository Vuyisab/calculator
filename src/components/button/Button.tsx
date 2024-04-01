import "./button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  const purple = ["history", "AC", "*", "/", "+", "-", "="];
  return (
    <button
      onClick={onClick}
      disabled={label === "*" || label === "/"} //only addition and subtraction is currently supported
      className={`${purple.includes(label) && "purple"} ${
        label === "=" && "button-equals"
      }`}
    >
      {label === "history" || label === "backspace" ? (
        <span className="material-symbols-outlined">{label}</span>
      ) : (
        label
      )}
    </button>
  );
}

export default Button;
