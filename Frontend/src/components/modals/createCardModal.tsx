import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../../elements/modal/modal";
import useJwtToken from "../../hooks/useJwtToken";
import { AppDispatch } from "../../store/store";
import { createCardThunk } from "../../store/thunks/cardThunk";
import { Card, Currency } from "../../types/User/Cards/card";

interface CreateCardModal {
  setIsOpen: (e: boolean) => void;
}

function CreateCardModal({ setIsOpen }: CreateCardModal) {
  const [cardModel, setCardModel] = useState<Partial<Card>>({
    balance: 0,
    cardNumber: "",
    currency: Currency.BYN,
    name: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { decodeToken } = useJwtToken();

  const updateModel = (value: string | number, property: keyof Card) => {
    if (property === "cardNumber") {
      if (value.toString().length > 16) {
        return;
      }
    }
    if (property === "name") {
      if (value.toString().length > 40) {
        return;
      }
    }

    if (property === "balance") {
      if (value.toString().length > 6) {
        return;
      }
    }
    setCardModel((prevstate) => ({ ...prevstate, [property]: value }));
  };

  const handleSucc = () => {
    setLoading(true);
    const token = decodeToken();

    if (cardModel && token?.UserId) {
      dispatch(
        createCardThunk({
          value: { ...cardModel, userId: token?.UserId } as Card,
          setError,
        })
      );
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <div>
      <Modal setOpenModal={setIsOpen} onSucc={handleSucc} title="Add new card">
        <div className="w-full">
          <span className="mt-4">Card number</span>
          <div className="mt-1 mb-[0.5] flex w-full items-center justify-between gap-8  ">
            <div className="flex-grow">
              <input
                type="number"
                value={cardModel?.cardNumber}
                onInput={(val) => updateModel(val.currentTarget.value, "cardNumber")}
                className="
                block
                w-full rounded-md border border-gray-300 bg-indigo-50 p-2.5 text-sm text-gray-900 transition-all
                placeholder:font-light
                focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
              />
            </div>
            <div className="relative w-28">
              <select
                value={cardModel?.currency}
                className="block w-full appearance-none rounded border  bg-indigo-200 py-3 px-4 pr-8 leading-tight text-indigo-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
                onChange={(val) => updateModel(val.currentTarget.value, "currency")}
                id="grid-state"
              >
                <option>{Currency.BYN}</option>
                <option>{Currency.EUR}</option>
                <option>{Currency.USD}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-4  flex w-full items-center justify-between gap-8  ">
            <div className="flex flex-grow gap-5">
              <div className="flex-grow">
                <span>Card name</span>
                <input
                  type="text"
                  value={cardModel?.name}
                  className="
                placeholder:font-lightfocus:border-indigo-500
                block w-full rounded-md border border-gray-300 bg-indigo-50 p-2.5 text-sm text-gray-900
                transition-all focus:outline-none focus:ring-indigo-500 "
                  onInput={(val) => updateModel(val.currentTarget.value, "name")}
                />
              </div>
              <div>
                <span>Balance</span>
                <input
                  type="number"
                  value={cardModel?.balance}
                  className="
                placeholder:font-lightfocus:border-indigo-500
                block w-full rounded-md border border-gray-300 bg-indigo-50 p-2.5 text-sm text-gray-900
                transition-all focus:outline-none focus:ring-indigo-500 "
                  onInput={(val) => updateModel(val.currentTarget.value, "balance")}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateCardModal;
