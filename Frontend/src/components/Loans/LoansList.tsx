/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import { Badge, Calendar, Popover, Whisper } from "rsuite";
import loans from "@/api/loans/loans";
import useJwtToken from "../../hooks/useJwtToken";
import { Loan } from "../../types/User/loans/loans";

function LoansList() {
  const [loanList, setLoanList] = useState<Loan[]>([]);
  const { decodeToken } = useJwtToken();

  function getTodoList(date: Date) {
    const day = date.getDate();
    date.setHours(0, 0, 0, 0);

    if (loanList.length > 0) {
      const t = loanList
        ?.filter((ind) => new Date(ind.returnDate).valueOf() === date.valueOf())
        ?.map((it) => ({
          name: it?.name,
          value: it?.amount,
          currency: it?.currency,
          id: it.id,
        }));
      return t;
    }
    return null;
  }

  async function getLoan() {
    const uid = decodeToken()?.UserId;
    if (uid) {
      const result = await loans.getUserLoans(uid);
      const json = await result.json();
      setLoanList(json);
    }
  }

  useEffect(() => {
    getLoan();
  }, []);

  async function handleDelete(id: string) {
    if (id) {
      const result = await loans.deleteLoan(id);
      getLoan();
    }
  }

  function renderCell(date: Date) {
    const list = getTodoList(date);
    const displayList = list?.filter((item, index) => index < 0);

    if (list?.length) {
      const moreCount = list?.length - displayList?.length;
      const moreItem = (
        <li className="rounded">
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <div className="w-28">
                      <b>{item.name}</b>
                      <div>
                        <span className="mr-1">{item.value}</span>
                        <span className="">{item.currency}</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          type="button"
                          className="mx-2 rounded p-1 transition hover:bg-indigo-100 "
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </p>
                ))}
              </Popover>
            }
          >
            <span className=" animate-pulse md:text-sm">Еще</span>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList &&
            displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{item.time}</b> - {item.amount}
              </li>
            ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }
  return (
    <div>
      <Calendar compact bordered renderCell={renderCell} />{" "}
    </div>
  );
}

export default LoansList;
