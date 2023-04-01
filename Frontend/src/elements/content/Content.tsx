import { BaseProps } from "@/types/props/defaultProps";
import React from "react";

function Content({ children }: BaseProps) {
  return <div className="mr-28 ml-28 flex h-screen w-full">{children}</div>;
}

export default Content;
