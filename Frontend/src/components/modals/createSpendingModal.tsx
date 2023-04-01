/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from "moment";
import React, { ChangeEvent, useState } from "react";
import { Calendar } from "rsuite";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Close from "images/icons/close.png";
import { Currency } from "../../types/User/Cards/card";
import { SpendingShopItemCategory } from "../../types/User/Spending/SpendingShopItemCategory";
import Stepper from "./spendingModal/stepper";
import { AppDispatch } from "../../store/store";
import useJwtToken from "../../hooks/useJwtToken";
import { createSpendingThunk } from "../../store/thunks/spendingThunks";
import getCardsThunk from "../../store/thunks/cardThunk";

interface CreateSpendingModalProps {
  setIsOpen: (e: boolean) => void;
  cardId: string;
}

function CreateSpendingModal({ setIsOpen, cardId }: CreateSpendingModalProps) {
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const allSteps: { title: string; description?: string }[] = [
    { title: "Add date" },
    { title: "Add transactions" },
    { title: "Finish" },
  ];
  const [step, setStep] = useState(0);

  const [date, setDate] = React.useState(new Date());
  const [spending, setSpending] = useState<{
    spendingName: string;
    shopName: string;
    date: Date;
  }>({ date: new Date(), shopName: "", spendingName: "" });
  const { decodeToken } = useJwtToken();

  const [errors, setErrors] = useState("");

  const updateSpending = (value: string | Date, prop: "date" | "shopName" | "spendingName") => {
    setSpending((prev) => ({ ...prev, [prop]: value }));
  };

  const updateSpendingName = (event: ChangeEvent<HTMLInputElement>) => {
    updateSpending(event.currentTarget.value, "spendingName");
  };

  const updateShopName = (event: ChangeEvent<HTMLInputElement>) => {
    updateSpending(event.currentTarget.value, "shopName");
  };

  const updateDate = (param: Date) => {
    updateSpending(param, "date");
  };

  const [shopPositions, setShopPositions] = useState<Partial<SpendingShopItemCategory>[]>([]);

  const [editableShopPosition, setEditableShopPosition] = useState<Partial<SpendingShopItemCategory>>({
    currency: Currency.BYN,
  });

  const handleChange = (newValue: Date) => {
    if (newValue) {
      updateDate(newValue);
    }
  };

  const onChange = (number: number) => {
    setStep(number);
    if (number === allSteps.length - 1) {
      const uid = decodeToken()?.UserId;
      if (uid) {
        dispatch(
          createSpendingThunk({
            setError: (e) => toast.error(e),
            body: {
              cardId,
              userId: uid,
              name: spending.spendingName,
              shopName: spending.shopName,
              shopPositions,
              spendingDate: spending.date,
            },
          })
        );
        dispatch(getCardsThunk({ setError: setErrors }));
      }

      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  const onNext = () => {
    onChange(step + 1);
  };

  const onPrev = () => {
    onChange(step - 1);
  };

  const editShopPosition = (value: number | string | Currency, prop: keyof SpendingShopItemCategory) => {
    setEditableShopPosition((prevState) => ({ ...prevState, [prop]: value }));
  };

  const updateName = (value: ChangeEvent<HTMLInputElement>) => {
    editShopPosition(value.currentTarget.value, "name");
  };

  const updatePrice = (value: ChangeEvent<HTMLInputElement>) => {
    if (Number(value.currentTarget.value) > 0 && value.currentTarget.value.length < 5) {
      editShopPosition(Number(value.currentTarget.value), "price");
    }
  };
  const updateShopPositionCurrency = (prop: ChangeEvent<HTMLSelectElement>) => {
    editShopPosition(prop.currentTarget.value, "currency");
  };

  const addNewShopPosition = () => {
    setShopPositions((prevState) => [...prevState, editableShopPosition]);
  };
  const deleteShopItem = (number: number) => {
    const t = shopPositions[number];

    setShopPositions((prevstate) => prevstate.filter((item) => item !== t));
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 h-full w-full bg-black opacity-40" onClick={() => setIsOpen(false)} />

      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-2xl rounded-md bg-white p-4 shadow-lg">
          <div className="mt-3 flex h-[600px] flex-col">
            <div className="border-b border-b-violet-400">
              <h3 className="mb-1 text-2xl font-bold text-violet-700">Add new transaction</h3>
            </div>
            <div className="my-2">
              <Stepper steps={allSteps} currentStep={step} />
            </div>
            {step === 0 && (
              <div className="flex justify-start">
                <div style={{ minWidth: 350, width: 350 }}>
                  <Calendar
                    bordered
                    compact
                    format="YYYY-MM-DD HH:mm:ss"
                    value={spending.date}
                    onChange={(value) => handleChange(value)}
                  />
                </div>
                <div className="mx-4 flex w-full flex-grow">
                  <div className="mt-4 flex w-full  flex-col gap-4">
                    <div className="flex w-full flex-col">
                      <span className="text-violet-600">Transaction name</span>
                      <input
                        type="text"
                        className="flex flex-grow rounded border border-violet-500 px-3 py-2 outline-none focus:outline-none"
                        value={spending.spendingName}
                        onChange={updateSpendingName}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-violet-600">Shop name</span>
                      <input
                        type="text"
                        className="flex flex-grow rounded border border-violet-500 px-3 py-2 outline-none focus:outline-none"
                        value={spending.shopName}
                        onChange={updateShopName}
                      />
                    </div>
                    <div className="flex h-full items-center justify-center text-center">
                      <p className="flex w-3/4 text-violet-900 opacity-50">
                        We will add this transaction to currently selected card
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="h-full w-full">
                <h4 className="border-b border-violet-400 px-2 text-violet-700 ">
                  {moment(date).format("dddd-mm-yyyy")}
                </h4>
                <div className="flex   w-full ">
                  <div className="w-3/5 ">
                    <div className="mt-3 flex w-full flex-col gap-3">
                      <div className="w-full">
                        <span className="mb-1 text-xs text-gray-400">
                          What did you by? e.g.
                          <i>banan</i>
                        </span>

                        <input
                          type="text"
                          className="flex w-full flex-grow rounded border border-violet-500 px-3 py-2 outline-none focus:outline-none"
                          placeholder="Shop position"
                          onChange={updateName}
                        />
                      </div>
                      <div className="h-10.5 mt-4 mb-2 flex w-full gap-2">
                        <input
                          type="number"
                          name=""
                          id=""
                          className="py flex w-36 flex-grow rounded border-violet-700 px-3 py-1 "
                          placeholder="Cost"
                          onChange={updatePrice}
                        />
                        <select
                          // value={cardModel?.currency}
                          className="flex w-32 appearance-none  rounded  border bg-violet-200 py-3 px-4 pr-8 leading-tight text-violet-700 focus:border-violet-500 focus:bg-white focus:outline-none"
                          // onChange={(val) =>
                          //   updateModel(val.currentTarget.value, "currency")
                          // }
                          id="grid-state"
                          disabled
                          value={editableShopPosition.currency}
                          onChange={updateShopPositionCurrency}
                          placeholder="How much did you spend"
                        >
                          <option>{Currency.BYN}</option>
                          <option>{Currency.EUR}</option>
                          <option>{Currency.USD}</option>
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="rounded bg-violet-700 px-6 py-3 text-violet-50 transition-all  hover:bg-violet-800"
                          onClick={addNewShopPosition}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  {shopPositions.length !== 0 && (
                    <div className="m-4 flex h-full max-h-80 w-2/5 flex-col items-center gap-2 overflow-y-auto border-l border-violet-500 pl-4">
                      <span>Shop positions</span>
                      {shopPositions.map((position, index) => (
                        <div className="flex w-full justify-between rounded border px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Name</span>
                            <span>{position.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400">Price</span>
                              <span>{position.price}</span>
                            </div>
                            <button
                              type="button"
                              className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-transparent transition-all hover:bg-violet-100"
                              onClick={() => deleteShopItem(index)}
                            >
                              <img src={Close} width={14} height={14} alt="close" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-5xl font-bold text-gray-400">Success</span>
              </div>
            )}

            {/* <div>{children}</div> */}
            <div className="mt-2 flex w-full justify-between gap-3 border-t border-t-violet-200 pt-3">
              <button
                type="button"
                className="rounded border border-violet-700 px-4 py-2 transition-all hover:bg-violet-100"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded border border-violet-700 bg-violet-700 px-6 py-2 text-violet-50 transition-all hover:bg-violet-800 hover:text-violet-50"
                  onClick={() => {
                    onPrev();
                  }}
                >
                  Go back
                </button>
                <button
                  type="button"
                  className="rounded border border-violet-700 bg-violet-700 px-6 py-2 text-violet-50 transition-all hover:bg-violet-800 hover:text-violet-50"
                  onClick={() => {
                    onNext();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSpendingModal;
