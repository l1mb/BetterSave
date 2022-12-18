import React, { FormEvent, useState } from "react";

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

  return <div className="w-full" />;
};

export default GiveLoanComponent;
