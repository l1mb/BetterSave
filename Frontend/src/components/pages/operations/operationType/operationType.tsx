import { BaseProps } from "@/types/props/defaultProps";
import React from "react";

export interface OperaionTypeProps extends BaseProps {
  label: string;
  onSelect: () => void;
}

function OperaionType({ label, onSelect }: OperaionTypeProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded px-9 py-2 transition-colors hover:animate-pulse hover:bg-slate-100"
    >
      {label}
    </button>
  );
}

export default OperaionType;
