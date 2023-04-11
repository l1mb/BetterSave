import { BaseProps } from "@/types/props/defaultProps";
import checkSwitchStatementDefaultCase from "@/utils/switchCheck";
import React, { useEffect, useState } from "react";
import DatePicker from "./datePicker/datePicker";
import OperationList from "./operationList/operationList";
import OperationType, { OperaionTypeProps } from "./operationType/operationType";
import styles from "./styles.module.scss";

type OperationProps = BaseProps;
type OperationType = "income" | "outcome" | "balance";

function Operations({}: OperationProps) {
  const [operationType, setOperationType] = useState<OperationType>("outcome");

  // temp
  // income
  const incomeArr = [
    {
      name: "Корона",
      value: 14.6,
    },
    {
      name: "Магнит",
      value: 14.6,
    },
    {
      name: "Пятерочка",
      value: 12,
    },
    {
      name: "Грин",
      value: 98,
    },
  ];

  const outcomeArr = [
    {
      name: "Корона",
      value: 14.6,
    },
    {
      name: "Магнит",
      value: 14.6,
    },
    {
      name: "Пятерочка",
      value: 12,
    },
    {
      name: "Грин",
      value: 98,
    },
  ];
  const [arr, setArr] = useState(outcomeArr.reverse());

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

  // income amount
  // outcome amount

  function getOpeartionArray() {
    if (operationType === "income") {
      setArr(incomeArr);
    } else {
      setArr(outcomeArr.reverse());
    }
  }

  useEffect(() => {
    console.log(operationType);
    getOpeartionArray();
    console.log(operationType);
  }, [operationType]);

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

  function selectActiveIncome() {
    setOperationType("income");
  }
  function selectActiveOutcome() {
    setOperationType("outcome");
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
      <div className="my-16 flex flex-col items-center justify-center">
        <span>
          Сейчас отображаются:{" "}
          <span className={`${styles.operationDropdown}`}>
            <span className="font-bold">{getOperationName(operationType)}</span>
            <div className="rounded px-2 py-1 shadow">
              {operationType === "income" && (
                <button type="button" onClick={selectActiveOutcome}>
                  Расходы
                </button>
              )}
              {operationType === "outcome" && (
                <button type="button" onClick={selectActiveIncome}>
                  Доходы
                </button>
              )}
            </div>
          </span>
        </span>
        <OperationList list={arr} />
      </div>
    </div>
  );
}

export default Operations;
