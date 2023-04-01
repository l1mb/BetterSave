import { BaseProps } from "@/types/props/defaultProps";
import checkSwitchStatementDefaultCase from "@/utils/switchCheck";
import React, { useState } from "react";
import DatePicker from "./datePicker/datePicker";
import OperationType, { OperaionTypeProps } from "./operationType/operationType";

type OperationProps = BaseProps;
type OperationType = "income" | "outcome" | "balance";

function Operations({}: OperationProps) {
  const [operationType, setOperationType] = useState<OperationType>("outcome");

  // dates
  const [date, setDate] = useState(new Date());

  const handleIncrement = () => {
    setDate((prevState) => {
      const t = prevState;
      t.setMonth(t.getMonth() + 1);
      return new Date(t);
    });
  };
  const handleDecrement = () => {
    setDate((prevState) => {
      const t = prevState;
      t.setMonth(t.getMonth() - 1);
      return new Date(t);
    });
  };

  function getOperationName(type: OperationType) {
    switch (type) {
      case "income":
        return "Доходы";
      case "outcome":
        return "Расходы";
      case "balance":
        return "Баланс";
      default:
        checkSwitchStatementDefaultCase(type);
        return "";
    }
  }

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
    <div className="mx-auto flex h-screen w-[566px]  flex-col py-24">
      {/* Header line */}
      <div className=" flex justify-evenly gap-4">
        {headerLine.map((x, index) => (
          <>
            <OperationType label={x.label} onSelect={x.onSelect} />
            {index !== headerLine.length - 1 && <span className="w-[1px] rounded bg-gray-700" />}
          </>
        ))}
      </div>
      <div className="my-16 flex justify-center">
        <DatePicker
          start={date}
          end={new Date(new Date(date).getTime() + 30 * 24 * 60 * 60 * 1000)}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </div>
      <div className="my-16 flex justify-center">
        <span>Сейчас отображаются: {getOperationName(operationType)}</span>
      </div>
    </div>
  );
}

export default Operations;
