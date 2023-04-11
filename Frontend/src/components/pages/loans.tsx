import React, { useState } from "react";
import styles from "../../styles/loans.module.scss";
import AddLoans from "../Loans/AddLoans";
import LoansList from "../Loans/LoansList";

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
      <div className={`${styles.pageContent}  my-12 h-full p-14 shadow-xl`}>
        <h1>Loans</h1>
        <div className="w-full">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goToAdd}
              className="rounded-md bg-indigo-700 py-2 px-4 text-indigo-50 transition hover:bg-indigo-800"
            >
              Add loan
            </button>
            <button
              type="button"
              onClick={goToGive}
              className="rounded-md bg-transparent py-2 px-4  text-indigo-900 transition hover:bg-indigo-700 hover:text-indigo-50"
            >
              Watch all loans
            </button>
          </div>
          <div className="w-full">{activePage === ActivePage.add ? <AddLoans /> : <LoansList />}</div>
        </div>
      </div>
    </div>
  );
}

export default Loans;
