import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full rounded border border-indigo-800 bg-indigo-800 py-2  px-6 text-indigo-100 transition hover:bg-indigo-100 hover:text-indigo-800"
  >
    {label}
  </button>
);

export default Button;
