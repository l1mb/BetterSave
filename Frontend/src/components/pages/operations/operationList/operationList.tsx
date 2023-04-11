import { BaseProps } from "@/types/props/defaultProps";
import React from "react";

interface OperationListProps extends BaseProps {
  list: {
    name: string;
    value: number;
  }[];
}

function OperationList({ list }: OperationListProps) {
  return (
    <div className="my-2 flex w-full flex-col items-center justify-center gap-1">
      {list.map((x) => (
        <div className="flex w-5/6 justify-between gap-3">
          <span className="w-1/5 font-bold">{x.name}</span>
          <span className="flex w-3/5  border-b-2 border-dotted" />
          <span className="w-1/5">
            <span className="font-bold">{x.value}</span> BYN
          </span>
        </div>
      ))}
    </div>
  );
}

export default OperationList;
