import { BaseProps } from "@/types/props/defaultProps";
import React, { useState } from "react";
import OperaionType, { OperaionTypeProps } from "./operationType/operationType";

type OperationProps = BaseProps;
type OperationType = "income" | "outcome" | "balance";

function Operations({}: OperationProps) {
  const [operationType, setOperationType] = useState<OperationType>("outcome");

  const headerLine: OperaionTypeProps[] = [
    {
      label: "Расходы",
      onSelect: () => setOperationType("outcome"),
    },
    {
      label: "Доходы",
      onSelect: () => setOperationType("income"),
    },
    {
      label: "Баланс",
      onSelect: () => setOperationType("balance"),
    },
  ];
  return (
    <div className="mx-auto my-24 w-[566px]">
      {/* Header line */}
      <div className="w-fu flex justify-evenly gap-4">
        {headerLine.map((x, index) => (
          <>
            <OperaionType label={x.label} onSelect={x.onSelect} />
            {index !== headerLine.length - 1 && <span className="w-[1px] rounded bg-gray-700" />}
          </>
        ))}
      </div>
    </div>
  );
}

export default Operations;
