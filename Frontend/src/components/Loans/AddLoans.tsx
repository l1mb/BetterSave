import moment from "moment";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Radio, Calendar } from "rsuite";
import loans from "@/api/loans/loans";
import useJwtToken from "../../hooks/useJwtToken";
import { Currency } from "../../types/User/Cards/card";
import { Loan } from "../../types/User/loans/loans";

function AddLoans() {
  const [resMessage, setResMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { decodeToken } = useJwtToken();

  const [loanTarget, setLoanTarget] = useState<"increase" | "decrease">("increase");

  const [pageState, setPageState] = useState<{
    borrowAmount: number;
    currency: string;
    date: Date;
    name: string;
  }>({
    borrowAmount: 0,
    currency: "BYN",
    date: new Date(),
    name: "",
  });
  async function handleAdd() {
    const uuid = decodeToken()?.UserId;
    if (uuid) {
      const dto: Loan = {
        amount: pageState.borrowAmount.toString(),
        currency: pageState.currency,
        returnDate: moment(pageState.date).format("L"),
        userId: uuid,
        isMine: loanTarget === "increase",
        name: pageState.name,
        description: "",
        id: "",
      };

      setLoading(true);
      const res = await loans.createLoan(dto);

      const message = await res.json();
      toast.success("Выполнено успешно");

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }
  return (
    <>
      <div>
        <h3>Вы хотите дать взаймы кому-то или отдолжить у кого-то?</h3>

        <div className="mt-6 flex flex-col md:flex-row md:justify-evenly">
          <div className="flex flex-col">
            <div className="flex flex-col ">
              <Radio
                id="html"
                name="type"
                checked={loanTarget === "decrease"}
                onChange={(val) => setLoanTarget("decrease")}
              >
                Дать кому-то взаймы
              </Radio>
              <Radio
                id="react"
                name="type"
                defaultChecked
                checked={loanTarget === "increase"}
                onChange={(val) => setLoanTarget("increase")}
              >
                Отдолжить у кого-то
              </Radio>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <span className="px-2 text-gray-400">{loanTarget === "increase" ? "У кого " : "Кому "} то</span>
              <input
                type="text"
                className="w-40 rounded-md"
                value={pageState.name}
                onChange={(val) => {
                  if (val.target.value.length < 15) {
                    setPageState((prev) => ({
                      ...prev,
                      name: val.target.value,
                    }));
                  }
                }}
              />
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <span className="px-2 text-gray-400">Сумма</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-40 rounded-md"
                  value={pageState.borrowAmount}
                  onChange={(val) => {
                    if (val.target.value.length < 6) {
                      setPageState((prev) => ({
                        ...prev,
                        borrowAmount: Number(val.target.value),
                      }));
                    }
                  }}
                />
                <select
                  //   value={pageState?.currency}
                  className="flex   appearance-none rounded border bg-indigo-200  pr-8 leading-tight text-indigo-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  //   onChange={(val) => handleUpdateCurrency(val)}
                  id="grid-state"
                >
                  <option>{Currency.BYN}</option>
                  <option>{Currency.EUR}</option>
                  <option>{Currency.USD}</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ minWidth: 350, width: 350 }}>
            <Calendar
              bordered
              compact
              format="YYYY-MM-DD HH:mm:ss"
              value={pageState.date}
              onChange={(value) => setPageState({ ...pageState, date: value })}
            />
            <button
              type="button"
              className=" mx-3 w-[328px] rounded bg-indigo-600 px-4 py-2 text-indigo-50 transition hover:bg-indigo-800"
              onClick={() => handleAdd()}
            >
              Добавить долг(займ)
            </button>
          </div>
        </div>
      </div>
      <div className="text-viole  mx-auto mt-10 w-8">
        {loading ? <HashLoader loading color="#6d28d9" /> : <span>{resMessage}</span>}
      </div>
    </>
  );
}

export default AddLoans;
