import React, { FormEvent, useState } from "react";
import { Currency } from "../../../types/User/Cards/card";

const GiveLoanComponent = () => {
  const [pageState, setPageState] = useState<{
    borrowAmount: number;
    isBorrowAmountActive: boolean;
    currency: string;
    isCurrencyActive: boolean;
    date: Date;
    isDateActive: boolean;
  }>({
    borrowAmount: 0,
    currency: "BYN",
    date: new Date(),
    isBorrowAmountActive: false,
    isCurrencyActive: false,
    isDateActive: false,
  });

  const handleUpdateBorrowed = (e: FormEvent<HTMLInputElement>) => {
    setPageState({ ...pageState, borrowAmount: Number(e.currentTarget.value) });
  };

  const handleUpdateCurrency = (e: FormEvent<HTMLSelectElement>) => {
    setPageState({
      ...pageState,
      currency: e.currentTarget.value,
    });
  };

  const handleUpdateDate = (e: FormEvent<HTMLInputElement>) => {
    setPageState({ ...pageState, date: Number(e.currentTarget.value) });
  };

  const handleClickOnMoney = () => {
    setPageState({ ...pageState, isBorrowAmountActive: true });
  };

  const handleFocusOver = () => {
    setPageState({ ...pageState, isBorrowAmountActive: false });
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
        <span>I want to take </span>
        {!pageState.isBorrowAmountActive ? (
          <button type="button" className="px-1" onClick={handleClickOnMoney}>
            {+pageState.borrowAmount}
          </button>
        ) : (
          <input
            type="number"
            className="mx-1 w-28 rounded-lg border border-violet-50 bg-transparent px-2 py-1 outline-none"
            onBlur={handleFocusOver}
            value={pageState.borrowAmount}
            onInput={handleUpdateBorrowed}
          />
        )}{" "}
        <select
          value={pageState?.currency}
          className="flex   appearance-none rounded border bg-violet-200  pr-8 leading-tight text-violet-700 focus:border-violet-500 focus:bg-white focus:outline-none"
          onChange={(val) => handleUpdateCurrency(val)}
          id="grid-state"
        >
          <option>{Currency.BYN}</option>
          <option>{Currency.EUR}</option>
          <option>{Currency.USD}</option>
        </select>
      </div>
    </div>
  );
};

export default GiveLoanComponent;
