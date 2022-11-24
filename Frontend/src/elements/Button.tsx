import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full rounded border border-violet-800 bg-violet-800 py-2  px-6 text-violet-100 transition hover:bg-violet-100 hover:text-violet-800"
  >
    {label}
  </button>
);

export default Button;
