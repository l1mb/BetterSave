import { BaseProps } from "@/types/props/defaultProps";
import React from "react";

interface HintProps extends BaseProps {
  message: string;
}

function Hint({ message }: HintProps) {
  return (
    <div className="bg-viol flex items-center justify-center gap-4 rounded-lg bg-indigo-50 px-3 py-2">
      <span className="text-5xl">!</span>
      <span className="font-bold">{message}</span>
    </div>
  );
}

export default Hint;
