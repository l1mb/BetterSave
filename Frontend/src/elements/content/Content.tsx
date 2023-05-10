import { BaseProps } from "@/types/props/defaultProps";
import React from "react";

function Content({ children }: BaseProps) {
  return <div className="flex h-screen w-full md:mr-28 md:ml-28">{children}</div>;
}

export default Content;
