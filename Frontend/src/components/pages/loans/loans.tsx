import React, { useState } from "react";
import styles from "./loans.module.scss";
import AddLoans from "../../Loans/AddLoans";
import LoansList from "../../Loans/LoansList";

enum ActivePage {
  add = 0,
  list = 1,
}

function Loans() {
  const [activePage, setActivePage] = useState(ActivePage.add);

  const goToAdd = () => {
    setActivePage(ActivePage.add);
  };

  const goToGive = () => {
    setActivePage(ActivePage.list);
  };

  return (
    <div className={` w-full ${styles.page}`}>
      <div className={`${styles.pageContent}  my-2 h-full p-4 shadow-xl md:my-12 md:p-14`}>
        <h1 className="mb-3">Долги и Займы</h1>
        <div className="w-full">
          <div className="flex flex-col items-start gap-3 md:flex-row">
            <button
              type="button"
              onClick={goToAdd}
              className="rounded-md bg-indigo-700 py-2 px-4 text-indigo-50 transition hover:bg-indigo-900"
            >
              Добавить долг (займ)
            </button>
            <button
              type="button"
              onClick={goToGive}
              className="rounded-md border bg-transparent py-2 px-4  text-indigo-900 transition hover:bg-indigo-700 hover:text-indigo-50"
            >
              Просмотреть все долги (займы)
            </button>
          </div>
          <div className="w-full">{activePage === ActivePage.add ? <AddLoans /> : <LoansList />}</div>
        </div>
      </div>
    </div>
  );
}

export default Loans;
