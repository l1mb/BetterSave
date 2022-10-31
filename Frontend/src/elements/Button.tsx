import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full rounded border border-blueberry-800 bg-blueberry-800 py-2  px-6 text-blueberry-100 transition hover:bg-blueberry-100 hover:text-blueberry-800"
  >
    {label}
  </button>
);

export default Button;
