import React from "react";
import { Link } from "react-router-dom";

interface LinkElementProps {
  link: string;
  label: string;
}

function LinkElement({ link, label }: LinkElementProps) {
  return (
    <Link to={link}>
      <span className="cursor-pointer rounded border border-transparent py-2  px-4 transition duration-150 hover:bg-indigo-500 hover:text-indigo-100 focus:shadow-sm">
        {label}
      </span>
    </Link>
  );
}

export default LinkElement;
